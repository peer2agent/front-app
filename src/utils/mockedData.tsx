// mockData.ts
export interface Transaction {
    timestamp: string;
    inputToken: string;
    inAmount: string;
    outputToken: string;
    outAmount: string;
    outAmountUsd: number;
    txId: string;
    isBuyToken: string;
}

export interface ReturnQueueMessage {
    inputToken: string;
    inAmount: string;
    outputToken: string;
    outAmount: string;
    outAmountUsd: number;
    txId: string;
    timestamp: string;
    isBuyToken: string;
}

// Generate dates for the last 7 days
const getDates = (): string[] => {
    const dates: string[] = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(now.getDate() - i);
        dates.push(date.toISOString());
    }

    return dates;
};

// Define token type
interface Token {
    symbol: string;
    address: string;
}

// Generate random transactions with realistic data
export const generateMockTransactions = (): Transaction[] => {
    const dates = getDates();
    const tokens: Token[] = [
        {
            symbol: "SOL",
            address: "So11111111111111111111111111111111111111112",
        },
        {
            symbol: "USDC",
            address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        },
        {
            symbol: "BONK",
            address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
        },
        {
            symbol: "PUMP",
            address: "HnPiBocjWADhD5HKHjnMq9CeGxuB38Rr5w5Xc5Repump",
        },
        {
            symbol: "JUP",
            address: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
        },
    ];

    return Array.from({ length: 50 }, (_, i) => {
        const randomDateIndex = Math.floor(Math.random() * dates.length);
        const date = new Date(dates[randomDateIndex]);

        // Add random hours to the date
        date.setHours(Math.floor(Math.random() * 24));
        date.setMinutes(Math.floor(Math.random() * 60));
        date.setSeconds(Math.floor(Math.random() * 60));

        const inputTokenIndex = Math.floor(Math.random() * tokens.length);
        let outputTokenIndex;
        do {
            outputTokenIndex = Math.floor(Math.random() * tokens.length);
        } while (outputTokenIndex === inputTokenIndex);

        const inAmount = (Math.random() * 1000 + 100).toFixed(2);
        const outAmount = (Math.random() * 500 + 50).toFixed(2);
        const outAmountUsd = Math.random() * 1000 + 200;

        return {
            timestamp: date.toISOString(),
            inputToken: tokens[inputTokenIndex].address,
            inAmount,
            outputToken: tokens[outputTokenIndex].address,
            outAmount,
            outAmountUsd,
            txId: `tx-${Math.random().toString(36).substring(2, 9)}`,
            isBuyToken: Math.random() > 0.5 ? "true" : "false",
        };
    });
};

// Interface for token price data
interface TokenPrice {
    date: string;
    price: number;
}

// Mock data for token price history (last 7 days)
export const generateTokenPriceHistory = (): Record<string, TokenPrice[]> => {
    const dates = getDates();
    const tokens = ["SOL", "USDC", "BONK", "PUMP", "JUP"];

    const result: Record<string, TokenPrice[]> = {};

    tokens.forEach((token) => {
        const basePrice =
            token === "USDC"
                ? 1
                : token === "SOL"
                ? 150
                : token === "JUP"
                ? 2.5
                : token === "PUMP"
                ? 0.5
                : 0.00001;
        const volatility =
            token === "USDC"
                ? 0.001
                : token === "SOL"
                ? 0.05
                : token === "JUP"
                ? 0.08
                : 0.15;

        result[token] = dates.map((date) => {
            const randomChange =
                1 + (Math.random() * volatility * 2 - volatility);
            return {
                date,
                price: basePrice * randomChange,
            };
        });
    });

    return result;
};

// Interface for daily volume data
interface DailyVolume {
    date: string;
    volume: number;
    count: number;
}

// Mock data for transaction volume by day
export const generateDailyVolume = (): DailyVolume[] => {
    const dates = getDates();

    return dates.map((date) => ({
        date,
        volume: Math.floor(Math.random() * 50000) + 10000,
        count: Math.floor(Math.random() * 50) + 10,
    }));
};

// Interface for token distribution data
interface TokenDistribution {
    token: string;
    percentage: number;
}

// Generate data for token distributions
export const generateTokenDistribution = (): TokenDistribution[] => {
    return [
        { token: "SOL", percentage: 35 },
        { token: "USDC", percentage: 25 },
        { token: "BONK", percentage: 15 },
        { token: "PUMP", percentage: 15 },
        { token: "JUP", percentage: 10 },
    ];
};

// Interface for aggregated mock data
interface MockDataAggregations {
    transactions: Transaction[];
    tokenPrices: Record<string, TokenPrice[]>;
    dailyVolume: DailyVolume[];
    tokenDistribution: TokenDistribution[];
}

// Mock data aggregations
export const mockDataAggregations: MockDataAggregations = {
    transactions: generateMockTransactions(),
    tokenPrices: generateTokenPriceHistory(),
    dailyVolume: generateDailyVolume(),
    tokenDistribution: generateTokenDistribution(),
};

export default mockDataAggregations;
