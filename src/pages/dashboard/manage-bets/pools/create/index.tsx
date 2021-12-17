import React from 'react';
import { Layout, CreatePoolForm } from 'components/index';
import { useAuthUser } from 'lib/useAuthUser';

const CreatePoolPage: React.FC = () => {
  const { userData } = useAuthUser();

  return (
    <Layout
      title="Create Pool"
      description="Create Pool"
      canonical="/dashboard/manage-bets/pools/create"
      hasNavbar
      hasFooter
    >
      <CreatePoolForm userData={userData} />
    </Layout>
  );
};

export default CreatePoolPage;
