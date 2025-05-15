import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import mockDataAggregations from "@/lib/mockData";
import { useMemo } from "react";

export default function PortfolioChart() {
    const chartData = useMemo(() => {
        // Create a combined value from token prices
        const tokens = ["SOL", "USDC", "BONK", "PUMP", "JUP"];
        const tokenPrices = mockDataAggregations.tokenPrices;

        // Calculate portfolio value over time (simplified simulation)
        return Object.values(tokenPrices["SOL"]).map((item, index) => {
            let totalValue = 0;
            tokens.forEach((token) => {
                const price = tokenPrices[token][index]?.price || 0;
                // Simulate different token quantities in portfolio
                const quantity =
                    token === "SOL"
                        ? 100
                        : token === "USDC"
                        ? 5000
                        : token === "BONK"
                        ? 10000000
                        : token === "PUMP"
                        ? 2000
                        : 500;
                totalValue += price * quantity;
            });

            return {
                date: new Date(item.date).toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                }),
                value: totalValue,
            };
        });
    }, []);

    const formatYAxis = (value: number) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
        return value.toFixed(0);
    };

    return (
        <Card className="border-border bg-secondary/20 backdrop-blur-sm h-full">
            <CardHeader className="pb-0">
                <CardTitle>Portfolio Value (USDC)</CardTitle>
            </CardHeader>
            <CardContent className="p-2 h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                    >
                        <defs>
                            <linearGradient
                                id="colorValue"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#8884d8"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#8884d8"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
                            tick={{ fill: "#a0aec0", fontSize: 12 }}
                            axisLine={{ stroke: "#374151" }}
                            tickLine={{ stroke: "#374151" }}
                        />
                        <YAxis
                            tickFormatter={formatYAxis}
                            tick={{ fill: "#a0aec0", fontSize: 12 }}
                            axisLine={{ stroke: "#374151" }}
                            tickLine={{ stroke: "#374151" }}
                        />
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#374151"
                            vertical={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1f2937",
                                border: "none",
                                borderRadius: "0.375rem",
                                color: "#e5e7eb",
                            }}
                            formatter={(value) => [
                                `$${Number(value).toLocaleString()}`,
                                "Value",
                            ]}
                            labelStyle={{ color: "#e5e7eb" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                                r: 6,
                                stroke: "#8884d8",
                                strokeWidth: 2,
                                fill: "#1f2937",
                            }}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
