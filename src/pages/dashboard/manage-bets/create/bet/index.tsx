import { Layout } from 'components/index';
import React from 'react';
import { useAuthUser } from 'lib/useAuthUser';
import { Box } from '@chakra-ui/react';

const BetIndexPage: React.FC = () => {
  const { userData } = useAuthUser();

  return (
    <>
      {userData && (
        <Layout
          title="Place Bet"
          description="Place Bet"
          canonical="/dashboard/manage-bets/create/bet"
          hasNavbar
          hasFooter
          schemaData={null}
        >
          <Box ml={[2, 2, 8]} display="block" top={20}>
            Create Bet Page Here
          </Box>
        </Layout>
      )}
    </>
  );
};

export default BetIndexPage;
