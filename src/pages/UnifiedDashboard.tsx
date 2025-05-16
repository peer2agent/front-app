import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { ClipboardPaste, Copy } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { traders } from "@/lib/mockTraders";
import mockedPortfolio from "@/lib/mockedPortfolio";
import { useKey } from "@/context/KeyContext";

import PortfolioChart from "@/components/dashboard/PortfolioChart";
import TokenDistribution from "@/components/dashboard/TokenDistribution";
import DailyVolume from "@/components/dashboard/DailyVolume";
import TransactionsTable from "@/components/dashboard/TransactionsTable";

export default function UnifiedDashboard() {
    const [walletInput, setWalletInput] = useState("");
    const [loading, setLoading] = useState(false);
    const { privateKey, hasKey, publicKey } = useKey();
    const navigate = useNavigate();

    const [portfolioData, setPortfolioData] = useState<any | null>(null);
    const [selectedWalletIndex, setSelectedWalletIndex] = useState<
        number | null
    >(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [stakedValue, setStakedValue] = useState<number | null>(null);

    useEffect(() => {
        if (!hasKey) {
            navigate("/");
        } else {
            fetchStakedValue();
        }
    }, [hasKey, privateKey, navigate]);

    const fetchStakedValue = async () => {
        if (!privateKey) return;

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/user/apport`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ publicKey: publicKey }),
                }
            );

            if (!res.ok) throw new Error("Failed to fetch apport");

            const data = await res.json();
            setStakedValue(data.amount || 0);
        } catch {
            toast.error("Failed to fetch apport. Showing 0.");
            setStakedValue(0);
        }
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setWalletInput(text);
        } catch {
            toast.error("Failed to read from clipboard");
        }
    };

    const handleTrack = async () => {
        const trimmed = walletInput.trim();
        if (!trimmed || !privateKey) {
            toast.error("Wallet and API key are required");
            return;
        }

        setLoading(true);
        try {
            const followRes = await fetch(
                `${import.meta.env.VITE_API_URL}/user/follow-trader`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        secretKey: privateKey,
                        traderPublicKey: trimmed,
                    }),
                }
            );

            if (!followRes.ok) throw new Error("Failed to follow trader");

            toast.success("Started tracking wallet");

            const trackRes = await fetch(
                `${import.meta.env.VITE_API_URL}/tracking`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ walletsToTraker: [trimmed] }),
                }
            );

            const data = trackRes.ok ? await trackRes.json() : null;
            const portfolio = data?.[0] || mockedPortfolio;

            setPortfolioData(portfolio);
            setSelectedWalletIndex(null);
            setModalOpen(true);

            setWalletInput("");
        } catch {
            toast.error("Failed to track wallet. Showing mock data.");
            setPortfolioData(mockedPortfolio);
            setSelectedWalletIndex(null);
            setModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async (address: string) => {
        try {
            await navigator.clipboard.writeText(address);
            toast.success("Copied to clipboard");
        } catch {
            toast.error("Failed to copy");
        }
    };

    const handleSeePortfolio = async (index: number) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/tracking`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ walletsToTraker: [traders[index]] }),
                }
            );

            const data = res.ok ? await res.json() : null;
            const portfolio = data?.[0] || mockedPortfolio;

            setPortfolioData(portfolio);
            setSelectedWalletIndex(index);
            setModalOpen(true);
        } catch {
            toast.error("Failed to fetch portfolio. Showing mock data.");
            setPortfolioData(mockedPortfolio);
            setSelectedWalletIndex(index);
            setModalOpen(true);
        }
    };

    return (
        <div className="py-8 pr-16 max-w-7xl mx-auto space-y-10">
            {stakedValue !== null && (
                <Card className="border-border bg-gradient-to-r from-green-500/10 to-green-400/10 backdrop-blur-sm p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-muted-foreground text-sm">
                                Your Active Stake
                            </p>
                            <p className="text-3xl font-bold text-green-400">
                                {stakedValue} SOL
                            </p>
                        </div>
                        <div className="text-green-300 bg-green-700/20 rounded-full px-3 py-1 text-sm font-medium">
                            Staked
                        </div>
                    </div>
                </Card>
            )}

            <h1 className="text-2xl font-bold mb-6">Track a wallet</h1>
            <div className="flex items-center gap-2">
                <Input
                    placeholder="Enter wallet address"
                    value={walletInput}
                    onChange={(e) => setWalletInput(e.target.value)}
                    className="bg-muted/50 flex-1"
                />
                <Button variant="outline" onClick={handlePaste}>
                    <ClipboardPaste className="w-4 h-4" />
                </Button>
                <Button onClick={handleTrack} disabled={loading}>
                    {loading ? "Tracking..." : "Track"}
                </Button>
            </div>

            <div className="space-y-4">
                {traders.map((wallet, idx) => (
                    <Card
                        key={idx}
                        className="border-border bg-secondary/20 backdrop-blur-sm p-4 flex justify-between items-center"
                    >
                        <div className="font-mono text-sm max-w-[140px]">
                            {wallet}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCopy(wallet)}
                            >
                                <Copy className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleSeePortfolio(idx)}
                            >
                                See Portfolio
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            <div>
                <h1 className="text-2xl font-bold mb-6">Your portfolio</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 max-h-[400px]">
                    <PortfolioChart />
                    <TokenDistribution />
                    <DailyVolume />
                </div>

                <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2">
                    <TransactionsTable />
                </div>
            </div>

            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            Portfolio of{" "}
                            {selectedWalletIndex !== null
                                ? traders[selectedWalletIndex].slice(0, 8)
                                : "Custom Wallet"}
                            ...
                        </DialogTitle>
                    </DialogHeader>

                    {portfolioData ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border border-border rounded-md p-4 bg-secondary/30">
                                <div>
                                    <p className="text-muted-foreground text-sm">
                                        Total USD Balance
                                    </p>
                                    <p className="text-2xl font-bold">
                                        ${portfolioData.usdBalance.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {Array.isArray(portfolioData?.filteredTokens) &&
                                portfolioData.filteredTokens.length > 0 ? (
                                    portfolioData.filteredTokens.map(
                                        (token: any) => (
                                            <div
                                                key={token.id}
                                                className="flex items-center justify-between border border-border rounded-md p-3 bg-secondary/20 hover:bg-secondary/30 transition"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm uppercase">
                                                        {token.symbol[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">
                                                            {token.symbol}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {token.quantity}{" "}
                                                            units
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">
                                                        $
                                                        {token.totalPrice.toFixed(
                                                            2
                                                        )}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {token.percentage}%
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <p className="text-muted-foreground">
                                        No tokens available
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p className="text-muted-foreground">
                            Loading portfolio...
                        </p>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
