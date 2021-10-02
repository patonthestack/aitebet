import React from 'react';
import { Layout, ViewPoolTable } from 'components/index';
import { usePools } from '@/hooks/usePools';

const ViewOwnedPoolsPage: React.FC = () => {
  const { poolsInvitedByUser } = usePools();

  return (
    <Layout
      title="Pool Invitations"
      description="Pool Invitations"
      canonical="/dashboard/manage-bets/pools/view/invited"
      hasNavbar
      hasFooter
    >
      <ViewPoolTable poolDataList={poolsInvitedByUser} type="invited" />
    </Layout>
  );
};

export default ViewOwnedPoolsPage;
