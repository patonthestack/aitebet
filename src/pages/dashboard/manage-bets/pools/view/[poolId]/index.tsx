import React from 'react';
import { Layout, ViewPoolSheet } from 'components/index';
import { usePools } from '@/hooks/usePools';
import { useRouter } from 'next/router';

const ViewPoolsPage: React.FC = () => {
  const router = useRouter();
  const { poolData } = usePools(router.query.poolId);

  return (
    <Layout
      title="View Pools"
      description="View Pools"
      canonical="/dashboard/manage-bets/pools/view"
      hasNavbar
      hasFooter
    >
      <ViewPoolSheet poolData={poolData} />
    </Layout>
  );
};

export default ViewPoolsPage;
