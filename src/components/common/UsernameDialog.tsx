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

interface UsernameDialogProps {
  open: boolean;
  onUsernameSet: (username: string) => void;
}

const UsernameDialog = ({ open, onUsernameSet }: UsernameDialogProps) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError('Username is required');
      return;
    }

    if (trimmedUsername.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(trimmedUsername)) {
      setError('Username can only contain letters, numbers, underscores, and hyphens');
      return;
    }

    // Save to localStorage
    localStorage.setItem('username', trimmedUsername);
    onUsernameSet(trimmedUsername);
    setError('');
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Welcome to Mochi</DialogTitle>
          <DialogDescription>
            Please enter your username to continue. This will be used to authenticate your API
            requests.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="john_doe"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                autoFocus
                className={error ? 'border-destructive' : ''}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <p className="text-xs text-muted-foreground">
                Username must be at least 3 characters (letters, numbers, _, -)
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UsernameDialog;
