import React from 'react';
import { Layout, PoolForm } from 'components/index';
import { useAuthUser } from 'lib/useAuthUser';

const PoolIndexPage: React.FC = () => {
  const { userData } = useAuthUser();

  return (
    <Layout
      title="Create Pool"
      description="Create Pool"
      canonical="/dashboard/manage-bets/create/pool"
      hasNavbar
      hasFooter
    >
      <PoolForm userData={userData} />
    </Layout>
  );
};

export default PoolIndexPage;
