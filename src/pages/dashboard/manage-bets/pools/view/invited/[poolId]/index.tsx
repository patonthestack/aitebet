import React from 'react';
import { Layout, ViewPoolSheet } from 'components/index';
import { usePools } from '@/hooks/usePools';
import { useRouter } from 'next/router';
import { useAuthUser } from '@/lib/useAuthUser';

const ViewPoolsPage: React.FC = () => {
  const router = useRouter();
  const { userData } = useAuthUser();
  const { poolData } = usePools(router.query.poolId);

  return (
    <Layout
      title="View Pools"
      description="View Pools"
      canonical="/dashboard/manage-bets/pools/view"
      hasNavbar
      hasFooter
    >
      <ViewPoolSheet userData={userData} poolData={poolData} />
    </Layout>
  );
};

export default ViewPoolsPage;
