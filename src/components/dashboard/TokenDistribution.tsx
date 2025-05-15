import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import mockDataAggregations from "@/lib/mockData";
import { useMemo } from "react";

export default function TokenDistribution() {
    const tokenData = useMemo(() => {
        return mockDataAggregations.tokenDistribution.map((item) => ({
            name: item.token,
            value: item.percentage,
            amount: `$${(item.percentage * 100).toFixed(2)}`,
        }));
    }, []);

    // Token colors
    const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042", "#A4A4F7"];

    // Custom tooltip to display both name and amount
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-background/90 p-2 border border-border rounded-md shadow-md">
                    <p className="font-medium">{`${data.name}: ${data.value}%`}</p>
                    <p className="text-muted-foreground">{data.amount}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="border-border bg-secondary/20 backdrop-blur-sm h-full">
            <CardHeader className="pb-0">
                <CardTitle>Token Distribution by Volume (USDC)</CardTitle>
            </CardHeader>
            <CardContent className="p-2 h-full">
                <div className="w-full" style={{ height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={tokenData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {tokenData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
