import { createContext, useContext, useState, ReactNode } from "react";

interface KeyContextType {
    privateKey: string | null;
    publicKey: string | null;
    walletKey: string | null;
    setPrivateKey: (key: string) => void;
    setPublicKey: (key: string) => void;
    setWalletKey: (key: string) => void;
    hasKey: boolean;
}

const KeyContext = createContext<KeyContextType | undefined>(undefined);

export function KeyProvider({ children }: { children: ReactNode }) {
    const [privateKey, setPrivateKey] = useState<string | null>(null);
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [walletKey, setWalletKey] = useState<string | null>(null);

    const hasKey = privateKey !== null;

    return (
        <KeyContext.Provider
            value={{
                privateKey,
                setPublicKey,
                publicKey,
                walletKey,
                setPrivateKey,
                setWalletKey,
                hasKey,
            }}
        >
            {children}
        </KeyContext.Provider>
    );
}

export function useKey() {
    const context = useContext(KeyContext);
    if (context === undefined) {
        throw new Error("useKey must be used within a KeyProvider");
    }
    return context;
}
