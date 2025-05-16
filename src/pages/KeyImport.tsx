import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKey } from "@/context/KeyContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

export default function KeyImport() {
    const [localPublicKey, setLocalPublicKey] = useState(
        "BrSe6VQsP2noN7RQ215aNYt8ZN33QyHQkdpBbGott9ro"
    );
    const [secretKey, setSecretKey] = useState(
        "2ye3hTDndew3s5TvAgoaesdZGrTR1AwiWuJcyKNAi9F7AYBPHLtt33UmcCRMV6QJVQa8VUrQkM5UnMYMaBo6JEsq"
    );
    const [amount, setAmount] = useState("1");
    const [loading, setLoading] = useState(false);
    const { setPrivateKey, setPublicKey } = useKey();

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        // const trimmedKeya = secretKey.trim();
        // setPrivateKey(trimmedKeya);
        // toast.success("Key validated and SOL apported");
        // navigate("/dashboard");
        // return;

        e.preventDefault();

        const privateKey = secretKey.trim();
        const publicKey = localPublicKey.trim();
        const parsedAmount = Number(amount);
        console.log({ privateKey });
        console.log({ publicKey });

        if (
            !publicKey ||
            !privateKey ||
            isNaN(parsedAmount) ||
            parsedAmount <= 0
        ) {
            toast.error("Please enter a valid key and amount");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/user/apport`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        secretKey: privateKey,
                        amount: parsedAmount,
                    }),
                }
            );

            if (!res.ok) throw new Error("API error");

            setPrivateKey(privateKey);
            setPublicKey(publicKey);
            toast.success("Key validated and SOL apported");
            navigate("/dashboard");
        } catch {
            toast.error("Failed to process apport");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md px-4">
                <Card className="border-border bg-secondary/20 backdrop-blur-sm">
                    <CardHeader className="text-center">
                        <div className="flex items-center justify-center py-4 px-2">
                            <img
                                src="/logo.png"
                                alt="Peer2Agent"
                                className="w-28"
                            />
                        </div>
                        <CardDescription>
                            Enter your Secret Key and SOL amount to access the
                            dashboard
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <Input
                                placeholder="Public key"
                                value={localPublicKey}
                                onChange={(e) =>
                                    setLocalPublicKey(e.target.value)
                                }
                                className="bg-muted/50"
                            />
                            <Input
                                placeholder="Secret Key"
                                value={secretKey}
                                onChange={(e) => setSecretKey(e.target.value)}
                                className="bg-muted/50"
                            />
                            <Input
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                type="number"
                                className="bg-muted/50"
                            />
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#A259FF] to-[#C084FF] hover:from-[#8A2EFF] hover:to-[#B070FF]"
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Import Key"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
