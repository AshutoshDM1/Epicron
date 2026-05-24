import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Key, Copy, Check, AlertTriangle, Loader2 } from 'lucide-react';
import api from '../../services/api';

interface McpKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const McpKeyDialog = ({ open, onOpenChange }: McpKeyDialogProps) => {
  const [name, setName] = useState('mochi-mcp-key');
  const [loading, setLoading] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Key name is required');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/v1/mcp/keys', { name: trimmedName });
      if (response.data?.success) {
        setGeneratedKey(response.data.data.apiKey);
      } else {
        setError(response.data?.message || 'Failed to generate API Key');
      }
    } catch (err: any) {
      console.error('Error generating key:', err);
      setError(err.response?.data?.message || err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    // Reset state on close
    setGeneratedKey(null);
    setName('Cursor IDE');
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) handleClose(); }}>
      <DialogContent className="sm:max-w-md animate-in fade-in zoom-in-95 duration-200">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary">
              <Key className="h-5 w-5" />
            </div>
            <DialogTitle className="text-xl font-bold tracking-tight">MCP API Keys</DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
            Generate a personal API Key to connect your IDE (Cursor, VS Code) to the Mochi Uptime Monitoring MCP server.
          </DialogDescription>
        </DialogHeader>

        {!generatedKey ? (
          /* Step 1: Request Key Name */
          <form onSubmit={handleGenerate}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="keyName" className="text-sm font-semibold">Key Name / Description</Label>
                <Input
                  id="keyName"
                  placeholder="Cursor IDE"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                  }}
                  autoFocus
                  disabled={loading}
                  className={`bg-background/50 focus:bg-background transition-all ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                />
                {error && <p className="text-xs text-destructive font-medium">{error}</p>}
                <p className="text-[11px] text-muted-foreground leading-normal">
                  Give this key a descriptive name to track where it is being used (e.g. Work Laptop).
                </p>
              </div>

              {/* CLI Installation Instructions (No Emoji) */}
              <div className="rounded-xl border bg-muted/20 p-4 space-y-2 text-xs leading-normal">
                <div className="font-bold tracking-wider uppercase text-[10px] text-primary">CLI Installation Guide</div>
                <p className="text-muted-foreground font-medium">
                  Once generated, you can automatically configure your IDE settings by installing and running our official CLI toolkit:
                </p>
                <div className="space-y-1 font-mono text-[11px] bg-background border p-2.5 rounded-lg text-foreground">
                  <div className="text-muted-foreground"># Install the CLI package globally</div>
                  <div>npm i -g mochi-mcp-kit</div>
                  <div className="text-muted-foreground mt-2"># Log in and update your IDE configuration</div>
                  <div>mochi-mcp login</div>
                </div>
              </div>
            </div>
            <DialogFooter className="pt-2">
              <Button type="submit" className="w-full cursor-pointer hover:shadow-md transition-all font-semibold" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate API Key'
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          /* Step 2: Display Generated Key & Instructions */
          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Your New API Key</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={generatedKey}
                  readOnly
                  className="font-mono bg-muted/40 border border-muted focus-visible:ring-0 select-all cursor-text text-xs"
                />
                <Button 
                  type="button" 
                  size="icon" 
                  onClick={handleCopy}
                  className="shrink-0 cursor-pointer transition-all bg-primary hover:bg-primary/95"
                >
                  {copied ? <Check className="h-4 w-4 text-primary-foreground" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Quickstart steps with generated key (No Emoji) */}
            <div className="rounded-xl border bg-muted/20 p-4 space-y-2 text-xs leading-normal">
              <div className="font-bold tracking-wider uppercase text-[10px] text-primary">How to Use Your Key</div>
              <p className="text-muted-foreground font-medium">
                Open your terminal and run the setup commands. The wizard will verify this key and configure your IDEs:
              </p>
              <div className="space-y-1 font-mono text-[11px] bg-background border p-2.5 rounded-lg text-foreground">
                <div className="text-muted-foreground"># Install globally</div>
                <div>npm i -g mochi-mcp-kit</div>
                <div className="text-muted-foreground mt-2"># Connect and configure Cursor / Antigravity</div>
                <div>mochi-mcp login</div>
              </div>
            </div>

            {/* Warn Block (No Emoji) */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-500 text-xs leading-normal">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <div className="space-y-1">
                <span className="font-bold uppercase tracking-wider text-[10px]">Security Warning</span>
                <p className="font-medium opacity-90">
                  Make sure to copy this key now. For security reasons, you will never be able to view it again.
                </p>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" onClick={handleClose} className="w-full cursor-pointer hover:shadow-md transition-all font-semibold">
                Done
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default McpKeyDialog;
