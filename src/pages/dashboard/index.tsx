import { Layout } from 'components/index';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'lib/auth';
import {
  Box,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { useDocument } from '@nandorojo/swr-firestore';
import DashboardCard from '@/components/Dashboard/DashboardCard';

const DashboardIndex: React.FC = () => {
  const { user } = useAuth(); // firebase authentication
  const router = useRouter();

  // GET userData
  const { data: userData } = useDocument<any>(`users/${user?.uid}`, {
    listen: false,
  });

  // check auth
  useEffect(() => {
    if (user === false) {
      router.push('/');
    }
  }, [user]);

  return (
    <>
      {user && (
        <Layout
          title="Dashboard"
          description="dashboard"
          canonical="/dashboard"
          schemaData={null}
          // isActive={userData?.user._isActive}
          // isBanned={userData?.user._isBanned}
        >
          <Flex>
            <Box
              flex="1"
              display="block"
            >
              <SimpleGrid
                spacing={6}
                columns={[1, 1, 2]}
                maxWidth="100%"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                margin="0 auto"
              >
                <DashboardCard
                  title="My Bets"
                  description="Manage your bets here"
                  buttonText="Manage Bets"
                  buttonLink="/dashboard/my-bets"
                />
                <DashboardCard
                  title="My Stats"
                  description="View your stats here"
                  buttonText="View Stats"
                  buttonLink="/dashboard/my-stats"
                />
                <DashboardCard
                  title="My Profile"
                  description="Edit Profile"
                  buttonText="Manage Profile"
                  buttonLink="/dashboard/my-profile"
                />
                <DashboardCard
                  title="My Friends"
                  description="Manage Friendships"
                  buttonText="Manage Friendships"
                  buttonLink="/friendships/my-friends"
                />
              </SimpleGrid>
            </Box>
          </Flex>
        </Layout>
      )}
    </>
  );
};

export default DashboardIndex;
