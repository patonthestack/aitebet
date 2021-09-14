import React from 'react';
import { Layout, ViewPoolTable } from 'components/index';
import { useAuthUser } from 'lib/useAuthUser';
import { usePools } from '@/hooks/usePools';

const ViewPoolsPage: React.FC = () => {
  const { userData } = useAuthUser();
  const { poolsOwnedByUser } = usePools();

  return (
    <Layout
      title="View Pools"
      description="View Pools"
      canonical="/dashboard/manage-bets/pools/view"
      hasNavbar
      hasFooter
    >
      <ViewPoolTable poolDataList={poolsOwnedByUser} />
    </Layout>
  );
};

export default ViewPoolsPage;
