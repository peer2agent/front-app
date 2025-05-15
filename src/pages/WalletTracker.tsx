
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKey } from '@/context/KeyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';

export default function WalletTracker() {
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const { setWalletKey, hasKey } = useKey();
  const navigate = useNavigate();

  // Redirect if no API key
  if (!hasKey) {
    navigate('/');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletAddress.trim()) {
      toast.error('Please enter a valid wallet address');
      return;
    }
    
    setLoading(true);
    
    // Simulate wallet validation
    setTimeout(() => {
      setWalletKey(walletAddress.trim());
      toast.success('Wallet tracking started');
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Track Wallet</h1>
      
      <Card className="border-border bg-secondary/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Track a Web3 Wallet</CardTitle>
          <CardDescription>
            Enter a public wallet address to start tracking its transactions
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="walletAddress"
                  placeholder="Enter wallet public key"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="bg-muted/50"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600" disabled={loading}>
              {loading ? 'Processing...' : 'Start Tracking'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
