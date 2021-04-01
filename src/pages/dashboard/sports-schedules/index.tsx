import { Layout, DashboardNav } from 'components/index';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'lib/auth';
import { useRequireAuth } from 'lib/useRequireAuth';
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

const SportsScheduleIndex: React.FC = () => {
  const { user } = useAuth(); // firebase authentication
  const { auth } = useRequireAuth();
  const router = useRouter();

  // GET userData
  const { data: userData } = useDocument<any>(`users/${user?.uid}`, {
    listen: false,
  });

  return (
    <>
      {user && (
        <Layout
          title="Sports Schedules"
          description="Sports Schedules"
          canonical="/sports-schedules"
          hasNavbar
          hasFooter
          schemaData={null}
          // isActive={userData?.user._isActive}
          // isBanned={userData?.user._isBanned}
        >
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

          <Box ml={['0px', '0px', '300px']} display="block" top="60px">
            <Flex
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              mt={20}
            ></Flex>

            <SimpleGrid
              spacing={6}
              columns={[1, 1, 1]}
              maxWidth="100%"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              margin="0 auto"
            >
              <Box
                backgroundColor="white"
                shadow="md"
                borderRadius="lg"
                py={5}
                mx={5}
              >
                <Box textAlign="center">
                  <Heading
                    size="md"
                    as="h2"
                    lineHeight="shorter"
                    fontWeight="bold"
                    fontFamily="heading"
                    pb={4}
                    mx={5}
                  >
                    Available Leagues
                  </Heading>
                </Box>
                <Box mx={5} spacing={5}>
                  <Button
                    mx={5}
                    colorScheme="blue"
                    variant="outline"
                    onClick={() =>
                      router
                        .push('/dashboard/sports-schedules/nba')
                        .then(() => window.scrollTo(0, 0))
                    }
                  >
                    NBA
                  </Button>
                  <Button
                    mx={5}
                    colorScheme="blue"
                    variant="outline"
                    onClick={() =>
                      router
                        .push('/dashboard/sports-schedules/nfl')
                        .then(() => window.scrollTo(0, 0))
                    }
                  >
                    NFL
                  </Button>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>
        </Layout>
      )}
    </>
  );
};

export default SportsScheduleIndex;
