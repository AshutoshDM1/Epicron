/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { createCron } from '@/services/cron.service';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  url: z.string().url(),
  interval: z.enum(['1', '10', '20', '30']),
});

const CreateCronForm = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [interval, setInterval] = useState<'1' | '10' | '20' | '30'>('1');
  const [url, setUrl] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createCron,
    onSuccess: () => {
      setUrl('');
      setInterval('1');
      setFormError(null);
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['cron'] });
    },
    onError: (error: any) => {
      setFormError(error.response?.data?.message || 'Failed to create monitor');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const result = formSchema.safeParse({ url, interval });
    if (!result.success) {
      setFormError('Please provide a valid URL and interval.');
      return;
    }

    const minutes = result.data.interval;
    // map minutes to a cron expression like "*/5 * * * *"
    const cronExpression = `*/${minutes} * * * *`;

    mutation.mutate({ interval: cronExpression, url: result.data.url });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="font-medium">
          + New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create monitor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interval">Interval</Label>
            <Select
              value={interval}
              onValueChange={(value: '1' | '10' | '20' | '30') => setInterval(value)}
            >
              <SelectTrigger id="interval">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectItem
                  value="1"
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                >
                  Every 1 minute
                </SelectItem>
                <SelectItem
                  value="10"
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                >
                  Every 10 minutes
                </SelectItem>
                <SelectItem
                  value="20"
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                >
                  Every 20 minutes
                </SelectItem>
                <SelectItem
                  value="30"
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                >
                  Every 30 minutes
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Interval is converted to a cron expression (e.g.{' '}
              <code className="font-mono">*/10 * * * *</code> for every 10 minutes).
            </p>
          </div>
          {formError && <p className="text-xs text-destructive">{formError}</p>}
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending || !url}>
              {mutation.isPending ? 'Creating…' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCronForm;
