import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import mockDataAggregations from "@/lib/mockData";
import { useMemo } from "react";

export default function DailyVolume() {
    const volumeData = useMemo(() => {
        return mockDataAggregations.dailyVolume.map((item) => ({
            date: new Date(item.date).toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
            }),
            volume: item.volume,
        }));
    }, []);

    const formatYAxis = (value: number) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
        return value.toFixed(0);
    };

    return (
        <Card className="border-border bg-secondary/20 backdrop-blur-sm h-full">
            <CardHeader className="pb-0">
                <CardTitle>Daily Transaction Volume</CardTitle>
            </CardHeader>
            <CardContent className="p-2 h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={volumeData}
                        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#374151"
                            vertical={false}
                        />
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
                        <Tooltip
                            formatter={(value) => [
                                `$${Number(value).toLocaleString()}`,
                                "Volume",
                            ]}
                            contentStyle={{
                                backgroundColor: "#1f2937",
                                border: "none",
                                borderRadius: "0.375rem",
                                color: "#e5e7eb",
                            }}
                        />
                        <Bar
                            dataKey="volume"
                            fill="#9f7aea"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
