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
              bg="green.300"
            >
              <DashboardNav
              // events={events}
              // userData={userData}
              // organizationId={userData?.user.organizationId}
              // exhibitorId={userData?.user.exhibitorId}
              />
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
                {/* Begin Stack */}
                <Stack>
                  <Box
                    backgroundColor="white"
                    shadow="md"
                    borderRadius="lg"
                    py={5}
                    mx={4}
                  >
                    <Flex
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Heading
                        size="md"
                        as="h2"
                        lineHeight="shorter"
                        fontWeight="bold"
                        fontFamily="heading"
                        pb={4}
                      >
                        MY BETS
                      </Heading>
                      <Text fontSize="md" px={5} textAlign="center">
                        Manage your bets here
                      </Text>
                    </Flex>
                    <Stack ml={4} shouldWrapChildren mt={4} mr={4}>
                      <Stack
                        shouldWrapChildren
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <Button
                          colorScheme="blue"
                          variant="outline"
                          onClick={() =>
                            router
                              .push('/dashboard/my-bets')
                              .then(() => window.scrollTo(0, 0))
                          }
                        >
                          MANAGE BETS
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
                {/* End Stack */}

                {/* Begin Stack */}
                <Stack>
                  <Box
                    backgroundColor="white"
                    shadow="md"
                    borderRadius="lg"
                    py={5}
                    mx={4}
                  >
                    <Flex
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Heading
                        size="md"
                        as="h2"
                        lineHeight="shorter"
                        fontWeight="bold"
                        fontFamily="heading"
                        pb={4}
                      >
                        LIVE SCHEDULES
                      </Heading>
                      <Text fontSize="md" px={5} textAlign="center">
                        View sports schedules here
                      </Text>
                    </Flex>
                    <Stack ml={4} shouldWrapChildren mt={4} mr={4}>
                      <Stack
                        shouldWrapChildren
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <Button
                          colorScheme="blue"
                          variant="outline"
                          onClick={() =>
                            router
                              .push('/dashboard/sports-schedules')
                              .then(() => window.scrollTo(0, 0))
                          }
                        >
                          VIEW SCHEDULES
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
                {/* End Stack */}

                {/* Begin Stack */}
                <Stack>
                  <Box
                    backgroundColor="white"
                    shadow="md"
                    borderRadius="lg"
                    py={5}
                    mx={4}
                  >
                    <Flex
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Heading
                        size="md"
                        as="h2"
                        lineHeight="shorter"
                        fontWeight="bold"
                        fontFamily="heading"
                        pb={4}
                      >
                        MY STATS
                      </Heading>
                      <Text fontSize="md" px={5} textAlign="center">
                        Manage your stats here
                      </Text>
                    </Flex>
                    <Stack ml={4} shouldWrapChildren mt={4} mr={4}>
                      <Stack
                        shouldWrapChildren
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <Button
                          colorScheme="blue"
                          variant="outline"
                          onClick={() =>
                            router
                              .push('/dashboard/my-work-experience')
                              .then(() => window.scrollTo(0, 0))
                          }
                        >
                          MANAGE STATS
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
                {/* End Stack */}

                {/* Begin Stack */}
                <Stack>
                  <Box
                    backgroundColor="white"
                    shadow="md"
                    borderRadius="lg"
                    py={5}
                    mx={4}
                  >
                    <Flex
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Heading
                        size="md"
                        as="h2"
                        lineHeight="shorter"
                        fontWeight="bold"
                        fontFamily="heading"
                        pb={4}
                      >
                        MY PROFILE
                      </Heading>
                      <Text fontSize="md" px={5} textAlign="center">
                        Manage your personal public profile
                      </Text>
                    </Flex>
                    <Stack ml={4} shouldWrapChildren mt={4} mr={4}>
                      <Stack
                        shouldWrapChildren
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        direction={['column', 'row']}
                      >
                        <Button
                          colorScheme="blue"
                          variant="outline"
                          onClick={() =>
                            router
                              .push('/dashboard/edit-user')
                              .then(() => window.scrollTo(0, 0))
                          }
                        >
                          MANAGE PROFILE
                        </Button>
                        {/* <Button
                              colorScheme="blue"
                              variant="outline"
                              onClick={() =>
                                router
                                  .push(`/user/profile/${user?.uid}`)
                                  .then(() => window.scrollTo(0, 0))
                              }
                            >
                              VIEW MY PROFILE
                            </Button> */}
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
                {/* End Stack */}
              </SimpleGrid>
            </Box>
          </Flex>
        </Layout>
      )}
    </>
  );
};

export default DashboardIndex;
