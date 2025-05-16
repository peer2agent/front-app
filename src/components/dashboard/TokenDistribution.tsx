import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import mockDataAggregations from "@/lib/mockData";

export default function TokenDistribution() {
    const tokenData = useMemo(() => {
        return mockDataAggregations.tokenDistribution.map((item) => ({
            name: item.token,
            value: item.percentage,
        }));
    }, []);

    // Neon balanced greens for readability
    const COLORS = [
        "#39FF14", // neon green (main highlight)
        "#A3FF00", // lime softer neon
        "#66FF66", // mint soft neon
        "#00B050", // emerald (deeper tone)
        "#1DB954", // darker neon green accent
    ];

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-background/90 p-2 border border-border rounded-md shadow-md">
                    <p className="font-medium">{data.name}</p>
                    <p className="text-muted-foreground">
                        {data.value.toFixed(2)}%
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="border-border bg-secondary/20 backdrop-blur-sm h-full">
            <CardHeader className="pb-0">
                <CardTitle>Token Distribution (%)</CardTitle>
            </CardHeader>
            <CardContent className="p-2 h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={tokenData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            stroke="none"
                        >
                            {tokenData.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
