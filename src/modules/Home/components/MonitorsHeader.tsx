import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilterIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CreateCronForm from './CreateCronForm/CreateCronForm';

export type FilterStatus = 'all' | 'up' | 'down' | 'pending' | 'error';

interface MonitorsHeaderProps {
  total: number;
  downCount?: number;
  filterStatus: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

const MonitorsHeader = ({ total, downCount = 0, filterStatus, onFilterChange }: MonitorsHeaderProps) => {
  const filterLabel = {
    all: 'All',
    up: 'Up',
    down: 'Down',
    pending: 'Pending',
    error: 'Error',
  }[filterStatus];

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Monitors.</h1>
          {total > 0 && (
            <Badge variant={downCount > 0 ? 'destructive' : 'secondary'}>
              {downCount > 0 ? `${downCount} down` : 'All up'}
            </Badge>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {total === 0
            ? 'No monitors yet. Create your first monitor to get started.'
            : `${total} active monitor${total > 1 ? 's' : ''}.`}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <FilterIcon className="h-4 w-4" />
              <span>{filterLabel}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={filterStatus} onValueChange={(value) => onFilterChange(value as FilterStatus)}>
              <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="up">Up</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="down">Down</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="error">Error</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <CreateCronForm />
      </div>
    </div>
  );
};

export default MonitorsHeader;
