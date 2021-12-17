import { Layout, DashboardNav } from 'components/index';
import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'lib/auth';
import { useRequireAuth } from 'lib/useRequireAuth';
import { Box, Button, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { useDocument } from '@nandorojo/swr-firestore';

const ViewPoolsIndex: React.FC = () => {
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
          title="View Pools"
          description="View Pools"
          canonical="/dashboard/manage-bets/pools/view"
          hasNavbar
          hasFooter
          schemaData={null}
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
                    Pools
                  </Heading>
                </Box>
                <Box mx={5} spacing={3}>
                  <Button
                    mx={2}
                    colorScheme="blue"
                    variant="outline"
                    onClick={() =>
                      router
                        .push('/dashboard/manage-bets/pools/view/owned')
                        .then(() => window.scrollTo(0, 0))
                    }
                  >
                    Owned
                  </Button>
                  <Button
                    mx={2}
                    colorScheme="blue"
                    variant="outline"
                    onClick={() =>
                      router
                        .push('/dashboard/manage-bets/pools/view/invited')
                        .then(() => window.scrollTo(0, 0))
                    }
                  >
                    Invited
                  </Button>
                  <Button
                    mx={2}
                    colorScheme="blue"
                    variant="outline"
                    onClick={() =>
                      router
                        .push('/dashboard/manage-bets/pools/view/historical')
                        .then(() => window.scrollTo(0, 0))
                    }
                  >
                    Historical
                  </Button>
                  <Button
                    mx={2}
                    colorScheme="blue"
                    variant="outline"
                    onClick={() =>
                      router
                        .push('/dashboard/manage-bets/pools/view/live')
                        .then(() => window.scrollTo(0, 0))
                    }
                  >
                    Live
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

export default ViewPoolsIndex;
