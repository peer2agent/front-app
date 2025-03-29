import { useEffect, useState } from "react";

import DashboardSection from "../DashboardSection";
import { mockDataAggregations } from "@/utils/mockedData";

import {
    PortfolioValueChart,
    TokenDistributionChart,
    DailyVolumeChart,
    TransactionsListComponent,
} from "./charts";

import {
    DashboardWrapper,
    DashboardTitle,
    TopRowContainer,
    ChartContainer,
    FullWidthContainer,
} from "./styles";

// Token name lookup (simplified for this example)
export const tokenNameMap: Record<string, string> = {
    So11111111111111111111111111111111111111112: "SOL",
    EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: "USDC",
    DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263: "BONK",
    HnPiBocjWADhD5HKHjnMq9CeGxuB38Rr5w5Xc5Repump: "PUMP",
    JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN: "JUP",
    H33XL6HHDReCVRgSApZpsXM7Hy7JGyLztRJaGxjapump: "PUMP",
    // Add other token mappings as needed
};

// Helper function to get token symbol or shortened address
export const getTokenLabel = (address: string) => {
    return (
        tokenNameMap[address] || `${address.slice(0, 4)}...${address.slice(-4)}`
    );
};

// Main Dashboard Component
export default function DashboardContent() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        // Simulate API call or SQS message processing
        const loadData = async () => {
            setLoading(true);

            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Convert the mock data to the format we need
            const processedData = mockDataAggregations.transactions.map(
                (tx) => ({
                    ...tx,
                    outAmountUsd:
                        tx.outAmountUsd || parseFloat(tx.outAmount) * 16.5, // Fallback calculation
                })
            );

            setData(processedData);
            setLoading(false);
        };

        loadData();

        // In a real implementation, you'd set up a subscription to SQS messages here
        const interval = setInterval(() => {
            // This would be replaced with actual SQS polling
            console.log("Polling for new transactions...");
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <DashboardSection>
            <DashboardWrapper>
                <TopRowContainer>
                    <ChartContainer>
                        <PortfolioValueChart data={data} loading={loading} />
                    </ChartContainer>

                    <ChartContainer>
                        <TokenDistributionChart data={data} loading={loading} />
                    </ChartContainer>

                    <ChartContainer>
                        <DailyVolumeChart data={data} loading={loading} />
                    </ChartContainer>
                </TopRowContainer>

                <FullWidthContainer>
                    <TransactionsListComponent data={data} loading={loading} />
                </FullWidthContainer>
            </DashboardWrapper>
        </DashboardSection>
    );
}
