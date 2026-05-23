/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Cron } from '@/services/cron.service';
import { deleteCron } from '@/services/cron.service';
import TableSkeleton from './Table/TableSkeleton';
import DeleteDialog from './DeleteDialog';
import ViewURLDialog from './ViewURLDialog';

interface MonitorsTableProps {
  crons: Cron[];
  isLoading?: boolean;
  error?: unknown;
}

const statusColorClasses: Record<string, string> = {
  UP: 'bg-emerald-500',
  DOWN: 'bg-red-500',
  PENDING: 'bg-amber-500',
  ERROR: 'bg-orange-500',
};

const MonitorsTable = ({ crons, isLoading, error }: MonitorsTableProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteCron,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cron'] });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <TableSkeleton rows={5} />;
  }

  if (error) {
    return <p className="text-sm text-destructive">Failed to load monitors. Please try again.</p>;
  }

  if (!crons.length) {
    return <p className="text-sm text-muted-foreground">No monitors found.</p>;
  }

  return (
    <div className="overflow-hidden rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Monitor</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Interval</TableHead>
            <TableHead className="w-[25%]">Uptime</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {crons.map((cron) => {
            const url = cron.url;
            const status = url?.status ?? 'PENDING';
            const statusColor = statusColorClasses[status] ?? statusColorClasses.PENDING;

            const totalUp = url?.totalUpTime ?? 0;
            const totalDown = url?.totalDownTime ?? 0;
            const total = totalUp + totalDown;
            const uptimePercent = total === 0 ? 0 : Math.round((totalUp / total) * 100);

            return (
              <TableRow key={cron.id}>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${statusColor}`} aria-hidden="true" />
                      <span className="font-medium">{url?.url ?? 'Unknown URL'}</span>
                    </div>
                    <span className="pl-4 text-xs text-muted-foreground">
                      Last checked:{' '}
                      {url?.lastCheckedAt ? new Date(url.lastCheckedAt).toLocaleString() : '—'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    HTTP
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{cron.interval}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Progress value={uptimePercent} className="h-1.5" />
                    <span className="text-xs text-muted-foreground">{uptimePercent}% uptime</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Badge
                      variant={
                        status === 'DOWN'
                          ? 'destructive'
                          : status === 'UP'
                          ? 'default'
                          : 'secondary'
                      }
                      className={`text-xs ${statusColor}`}
                    >
                      {status}
                    </Badge>
                    <ViewURLDialog cronId={cron.id} />
                    <DeleteDialog cron={cron} onClick={() => handleDelete(cron.id)} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MonitorsTable;
