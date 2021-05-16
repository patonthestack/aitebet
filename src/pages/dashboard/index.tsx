import { Layout, DashboardNav } from 'components/index';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'lib/auth';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Avatar,
} from '@chakra-ui/react';
import { userProviderCheck } from 'helpers/index';
import NextLink from 'next/link';
import { useDocument, useCollection } from '@nandorojo/swr-firestore';
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
          hasNavbar
          hasFooter
          schemaData={null}
          // isActive={userData?.user._isActive}
          // isBanned={userData?.user._isBanned}
        >
          <Flex>
            <Box
              w={['0px', '300px', '300px']}
              position="fixed"
              display={['none', 'none', 'block']}
              top="60px"
              h="100%"
              bg="blue.300"
            >
              <DashboardNav />
            </Box>

            <Box
              flex="1"
              ml={['0px', '0px', '300px']}
              display="block"
              top="60px"
            >
              <Flex
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                mt={20}
              >
                {/* <Flex direction="column" align={['center', 'center']} my="20px">
                  <NextLink href="/avatarupload">
                    <a>
                      <Avatar
                        w={['3rem', '6rem']}
                        h={['3rem', '6rem']}
                        mb={4}
                        src={userData?.user?.photoUrl}
                      />
                    </a>
                  </NextLink>
                  <Heading>
                    {userData?.user?.firstName} {userData?.user?.middleName}{' '}
                    {userData?.user?.lastName}
                  </Heading>
                  <Text>{userData?.user?.email}</Text>
                  {/* <Text>{userData?.user?.userType}</Text> */}
                {/* <Text>{userRoleCheck(userData)}</Text>
                </Flex>  */}
              </Flex>

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
