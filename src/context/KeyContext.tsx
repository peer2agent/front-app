
import { createContext, useContext, useState, ReactNode } from 'react';

interface KeyContextType {
  apiKey: string | null;
  walletKey: string | null;
  setApiKey: (key: string) => void;
  setWalletKey: (key: string) => void;
  hasKey: boolean;
}

const KeyContext = createContext<KeyContextType | undefined>(undefined);

export function KeyProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [walletKey, setWalletKey] = useState<string | null>(null);

  const hasKey = apiKey !== null;

  return (
    <KeyContext.Provider value={{ apiKey, walletKey, setApiKey, setWalletKey, hasKey }}>
      {children}
    </KeyContext.Provider>
  );
}

export function useKey() {
  const context = useContext(KeyContext);
  if (context === undefined) {
    throw new Error('useKey must be used within a KeyProvider');
  }
  return context;
}
