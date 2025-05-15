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
    CardTitle,
} from "@/components/ui/card";

export default function Index() {
    const [key, setKey] = useState("");
    const { setApiKey } = useKey();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (key.trim()) {
            setApiKey(key);
            navigate("/dashboard");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Card className="w-full max-w-md border-border bg-secondary/20 backdrop-blur-sm">
                <CardHeader className="space-y-1">
                    <div className="flex flex-col items-center mb-4">
                        <img
                            src="/logo.png"
                            alt="Peer2Agent"
                            className="w-16 h-16 mb-2"
                        />
                        <CardTitle className="text-2xl font-bold">
                            Peer2Agent
                        </CardTitle>
                    </div>
                    <CardDescription>
                        Enter your Key to access the dashboard
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Input
                                    id="key"
                                    placeholder="API Key"
                                    type="password"
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            Import Key
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
