import {
    LineChart,
    BarChart,
    PieChart,
    Line,
    Bar,
    Pie,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { getTokenLabel } from "./index";
import {
    ChartCard,
    ChartTitle,
    LoadingContainer,
    TransactionContainer,
    TransactionHeader,
    TransactionList,
    TransactionItem,
    TokenAddress,
    ValueText,
    TimeStamp,
} from "./styles";

interface ChartProps {
    data: any[];
    loading: boolean;
}

interface PortfolioEntry {
    timestamp: string;
    value: number;
    date: string;
}

interface ChartDataEntry {
    token: string;
    value: number;
}

interface DailyVolumeEntry {
    date: string;
    volume: number;
    count: number;
}

interface Transaction {
    timestamp: string;
    inputToken: string;
    outputToken: string;
    outAmount: string;
    outAmountUsd: number | string;
    isBuyToken: string;
}

// Portfolio Value Over Time Chart
export const PortfolioValueChart = ({ data, loading }: ChartProps) => {
    if (loading)
        return (
            <ChartCard>
                <LoadingContainer>Loading portfolio data...</LoadingContainer>
            </ChartCard>
        );

    // Process transactions to get portfolio value over time
    const portfolio: PortfolioEntry[] = [...data]
        .sort(
            (a, b) =>
                new Date(a.timestamp).getTime() -
                new Date(b.timestamp).getTime()
        )
        .reduce((acc: PortfolioEntry[], tx: Transaction) => {
            const lastValue = acc.length > 0 ? acc[acc.length - 1].value : 0;

            // Simplified calculation: add to portfolio if buying, subtract if selling
            const txValue =
                typeof tx.outAmountUsd === "string"
                    ? parseFloat(tx.outAmountUsd)
                    : tx.outAmountUsd;

            const newValue =
                tx.isBuyToken === "true"
                    ? lastValue + txValue
                    : lastValue - txValue;

            acc.push({
                timestamp: tx.timestamp,
                value: newValue,
                date: new Date(tx.timestamp).toLocaleDateString(),
            });

            return acc;
        }, []);

    return (
        <ChartCard>
            <ChartTitle>Portfolio Value (USDC)</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={portfolio}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255, 255, 255, 0.1)"
                    />
                    <XAxis
                        dataKey="date"
                        tickFormatter={(value: string) => value}
                        stroke="#e0e0e0"
                    />
                    <YAxis
                        domain={["dataMin - 100", "dataMax + 100"] as any}
                        stroke="#e0e0e0"
                    />
                    <Tooltip
                        formatter={(value: number) => [
                            `$${value.toFixed(2)}`,
                            "Portfolio Value",
                        ]}
                        labelFormatter={(label: string) => label}
                        cursor={{ stroke: "rgba(255, 255, 255, 0.3)" }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#6366f1"
                        name="Portfolio Value (USDC)"
                        dot={false}
                        isAnimationActive={false} // Propriedade corretamente aplicada ao componente Line
                        activeDot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

// Token Distribution Chart
export const TokenDistributionChart = ({ data, loading }: ChartProps) => {
    if (loading)
        return (
            <ChartCard>
                <LoadingContainer>
                    Loading token distribution data...
                </LoadingContainer>
            </ChartCard>
        );

    // Group transactions by token and calculate total volume
    const tokenVolumes = data.reduce(
        (acc: Record<string, number>, tx: Transaction) => {
            const outputToken = tx.outputToken;
            const volume =
                typeof tx.outAmountUsd === "string"
                    ? parseFloat(tx.outAmountUsd)
                    : tx.outAmountUsd;

            if (tx.isBuyToken === "true" && !isNaN(volume)) {
                if (!acc[outputToken]) {
                    acc[outputToken] = 0;
                }
                acc[outputToken] += volume;
            }

            return acc;
        },
        {}
    );

    // Convert to array for the chart
    const chartData: ChartDataEntry[] = Object.entries(tokenVolumes).map(
        ([token, volume]) => ({
            token: getTokenLabel(token),
            value: volume as number,
        })
    );

    // Sort by value descending
    chartData.sort((a, b) => b.value - a.value);

    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#8884d8",
        "#82ca9d",
    ];

    return (
        <ChartCard>
            <ChartTitle>Token Distribution by Volume (USDC)</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="token"
                        label={({ token, value }: ChartDataEntry) =>
                            `${token}: $${value.toFixed(0)}`
                        }
                        isAnimationActive={false} // Propriedade corretamente aplicada ao componente Pie
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number) => [
                            `$${value.toFixed(2)}`,
                            "Volume",
                        ]}
                        cursor={{ fill: "none" }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

// Daily Transaction Volume Chart
export const DailyVolumeChart = ({ data, loading }: ChartProps) => {
    if (loading)
        return (
            <ChartCard>
                <LoadingContainer>
                    Loading daily volume data...
                </LoadingContainer>
            </ChartCard>
        );

    // Group transactions by day
    const volumeByDay = data.reduce(
        (acc: Record<string, DailyVolumeEntry>, tx: Transaction) => {
            const date = new Date(tx.timestamp).toLocaleDateString();
            const volume =
                typeof tx.outAmountUsd === "string"
                    ? parseFloat(tx.outAmountUsd)
                    : tx.outAmountUsd;

            if (!isNaN(volume)) {
                if (!acc[date]) {
                    acc[date] = { date, volume: 0, count: 0 };
                }
                acc[date].volume += volume;
                acc[date].count += 1;
            }

            return acc;
        },
        {}
    );

    // Convert to array for the chart
    const chartData: DailyVolumeEntry[] = Object.values(volumeByDay);

    // Sort by date
    chartData.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return (
        <ChartCard>
            <ChartTitle>Daily Transaction Volume</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255, 255, 255, 0.1)"
                    />
                    <XAxis dataKey="date" stroke="#e0e0e0" />
                    <YAxis stroke="#e0e0e0" />
                    <Tooltip
                        formatter={(value: number) => [
                            `$${value.toFixed(2)}`,
                            "Volume",
                        ]}
                        cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
                    />
                    <Legend />
                    <Bar
                        dataKey="volume"
                        fill="#8884d8"
                        name="Volume (USDC)"
                        isAnimationActive={false} // Propriedade corretamente aplicada ao componente Bar
                    />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

// Transaction List Component
export const TransactionsListComponent = ({ data, loading }: ChartProps) => {
    if (loading)
        return <LoadingContainer>Loading transactions...</LoadingContainer>;

    // Sort transactions by timestamp (newest first)
    const sortedTransactions = [...data].sort(
        (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return (
        <TransactionContainer>
            <ChartTitle style={{ padding: "16px 16px 0 16px" }}>
                Latest Transactions
            </ChartTitle>
            <TransactionHeader>
                <div>Time</div>
                <div>From Token</div>
                <div>To Token</div>
                <div>Amount</div>
                <div>Value (USDC)</div>
            </TransactionHeader>
            <TransactionList>
                {sortedTransactions.map((tx: Transaction, index: number) => (
                    <TransactionItem key={index}>
                        <TimeStamp>
                            {new Date(tx.timestamp).toLocaleString()}
                        </TimeStamp>
                        <div>
                            <TokenAddress title={tx.inputToken}>
                                {getTokenLabel(tx.inputToken)}
                            </TokenAddress>
                        </div>
                        <div>
                            <TokenAddress title={tx.outputToken}>
                                {getTokenLabel(tx.outputToken)}
                            </TokenAddress>
                        </div>
                        <div>{parseFloat(tx.outAmount).toFixed(4)}</div>
                        <ValueText isBuy={tx.isBuyToken === "true"}>
                            $
                            {typeof tx.outAmountUsd === "string"
                                ? parseFloat(tx.outAmountUsd).toFixed(2)
                                : tx.outAmountUsd.toFixed(2)}
                        </ValueText>
                    </TransactionItem>
                ))}
            </TransactionList>
        </TransactionContainer>
    );
};
