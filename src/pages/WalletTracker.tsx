import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { ClipboardPaste, Copy } from "lucide-react";
import { traders } from "@/lib/mockTraders";
import { useKey } from "@/context/KeyContext";

export default function WalletTracker() {
    const [walletInput, setWalletInput] = useState("");
    const [loading, setLoading] = useState(false);
    const { apiKey } = useKey();

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
        if (!trimmed || !apiKey) {
            toast.error("Wallet and API key are required");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/user/follow-trader`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        secretKey: apiKey,
                        traderPublicKey: trimmed,
                    }),
                }
            );

            if (!res.ok) throw new Error("Request failed");

            toast.success("Started tracking wallet");
            setWalletInput("");
        } catch {
            toast.error("Failed to track wallet");
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

    return (
        <div className="p-6 max-w-2xl mx-auto space-y-6">
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

            <div className="max-h-[1000px] overflow-y-auto space-y-4 pr-1">
                {traders.map((wallet, idx) => (
                    <Card
                        key={idx}
                        className="border-border bg-secondary/20 backdrop-blur-sm"
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-mono break-all">
                                {wallet}
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCopy(wallet)}
                            >
                                <Copy className="w-4 h-4" />
                            </Button>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}
