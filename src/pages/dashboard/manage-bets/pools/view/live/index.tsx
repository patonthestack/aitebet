import React from 'react';
import { Layout, ViewPoolTable } from 'components/index';
import { usePools } from '@/hooks/usePools';

const LivePoolsPage: React.FC = () => {
  const { liveUserPoolsData } = usePools();

  return (
    <Layout
      title="Live Pools"
      description="Live Pools"
      canonical="/dashboard/manage-bets/pools/view/live"
      hasNavbar
      hasFooter
    >
      <ViewPoolTable poolDataList={liveUserPoolsData} type="live" />
    </Layout>
  );
};

export default LivePoolsPage;
