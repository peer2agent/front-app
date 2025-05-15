
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKey } from '@/context/KeyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';

export default function KeyImport() {
  const [inputKey, setInputKey] = useState('');
  const [loading, setLoading] = useState(false);
  const { setApiKey } = useKey();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }
    
    setLoading(true);
    
    // Simulate API key validation
    setTimeout(() => {
      setApiKey(inputKey.trim());
      toast.success('API key imported successfully');
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <Card className="border-border bg-secondary/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">CT</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gradient">CryptoTracker</CardTitle>
            <CardDescription>
              Enter your API key to access the crypto tracking dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="apiKey"
                    placeholder="Enter your API key"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    className="bg-muted/50"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600" disabled={loading}>
                {loading ? 'Importing...' : 'Import Key'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
