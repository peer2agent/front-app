
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import mockDataAggregations from "@/lib/mockData";
import { useMemo } from "react";

// Token address to symbol map for display
const TOKEN_MAP: Record<string, string> = {
  "So11111111111111111111111111111111111111112": "SOL",
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": "USDC",
  "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263": "BONK",
  "HnPiBocjWADhD5HKHjnMq9CeGxuB38Rr5w5Xc5Repump": "PUMP",
  "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN": "JUP"
};

export default function TransactionsTable() {
  const transactions = useMemo(() => {
    // Get the base transactions
    const baseTransactions = [...mockDataAggregations.transactions]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    // Create 3 negative transactions
    const negativeTransactions = baseTransactions.slice(0, 3).map(tx => ({
      ...tx,
      outAmountUsd: -Math.abs(Number(tx.outAmountUsd))
    }));
    
    // Replace the first 3 transactions with the negative ones
    const result = [...baseTransactions];
    result.splice(0, 3, ...negativeTransactions);
    
    // Return the 10 most recent transactions
    return result.slice(0, 10);
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
  };

  return (
    <Card className="col-span-3 border-border bg-secondary/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Latest Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto max-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>From Token</TableHead>
                <TableHead>To Token</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Value (USDC)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => {
                const inputSymbol = TOKEN_MAP[tx.inputToken] || 'UNKNOWN';
                const outputSymbol = TOKEN_MAP[tx.outputToken] || 'UNKNOWN';
                const isPositive = Number(tx.outAmountUsd) > 0;
                
                return (
                  <TableRow key={tx.txId}>
                    <TableCell className="font-mono text-xs">
                      {formatDate(tx.timestamp)}
                    </TableCell>
                    <TableCell>{inputSymbol}</TableCell>
                    <TableCell>{outputSymbol}</TableCell>
                    <TableCell>{tx.outAmount}</TableCell>
                    <TableCell className={`text-right ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {isPositive ? '+' : '-'}${Math.abs(Number(tx.outAmountUsd)).toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
