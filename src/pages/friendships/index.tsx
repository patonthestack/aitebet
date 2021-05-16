import React from 'react';
import { Layout, DashboardNav } from 'components/index';
import { useRouter } from 'next/router';
import {
  Box,
  Flex,
  Heading,
  Stack,
  SimpleGrid,
  Text,
  Button,
} from '@chakra-ui/react';
import { useAuthUser } from '@/lib/useAuthUser';

const FriendshipsIndex: React.FC = () => {
  const { userData } = useAuthUser();
  const router = useRouter();

  return (
    <>
      {userData && (
        <Layout
          title="Friendships"
          description="Friendships"
          canonical="/friendships"
          hasNavbar
          hasFooter
          schemaData={null}
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
              ></Flex>

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
                        FIND FRIENDS
                      </Heading>
                      <Text fontSize="md" px={5} textAlign="center">
                        Find and Add Friends Here
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
                              .push('/friendships/find-friends')
                              .then(() => window.scrollTo(0, 0))
                          }
                        >
                          FIND FRIENDS
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
                        FRIEND REQUESTS
                      </Heading>
                      <Text fontSize="md" px={5} textAlign="center">
                        Manage Your Friend Requests
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
                              .push('/friendships/my-friends')
                              .then(() => window.scrollTo(0, 0))
                          }
                        >
                          FRIEND REQUESTS
                        </Button>
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

export default FriendshipsIndex;
