import React from 'react';
import { Layout, ViewPoolTable } from 'components/index';
import { usePools } from '@/hooks/usePools';

const ViewOwnedPoolsPage: React.FC = () => {
  const { poolsOwnedByUser } = usePools();

  return (
    <Layout
      title="Owned Pools"
      description="Owned Pools"
      canonical="/dashboard/manage-bets/pools/view/owned"
      hasNavbar
      hasFooter
    >
      <ViewPoolTable poolDataList={poolsOwnedByUser} type="owned" />
    </Layout>
  );
};

export default ViewOwnedPoolsPage;
