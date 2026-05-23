import { useMemo, useState } from 'react';
import useCron from '../../hooks/use-cron';
import MonitorsHeader, { type FilterStatus } from './components/MonitorsHeader';
import MonitorsTable from './components/MonitorsTable';
import Header from '@/components/common/Topbar/Topbar';

const Home = () => {
  const { cron, isLoading, error } = useCron();
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const downCount = cron.filter((c) => c.url?.status === 'DOWN').length;

  // Filter crons based on selected status
  const filteredCrons = useMemo(() => {
    if (filterStatus === 'all') {
      return cron;
    }

    return cron.filter((c) => {
      const status = c.url?.status?.toUpperCase();
      return status === filterStatus.toUpperCase();
    });
  }, [cron, filterStatus]);

  return (
    <div className="flex flex-col min-h-screen animate-in fade-in duration-200">
      <Header />
      <div className="w-full max-w-7xl mx-auto px-4 py-6">
        <MonitorsHeader
          total={cron.length}
          downCount={downCount}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
        />
        <MonitorsTable
          crons={filteredCrons}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Home;
