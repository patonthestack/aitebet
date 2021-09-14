import { Layout, DashboardNav } from 'components/index';
import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'lib/auth';
import { useRequireAuth } from 'lib/useRequireAuth';
import { Box, Button, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { useDocument } from '@nandorojo/swr-firestore';

const GeneralBetsIndex: React.FC = () => {
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
                    Bet Type
                  </Heading>
                </Box>
                <Box mx={5} spacing={3}>
                  <Button
                    mx={2}
                    colorScheme="blue"
                    variant="outline"
                    onClick={() =>
                      router
                        .push('/dashboard/manage-bets/general-bets/create')
                        .then(() => window.scrollTo(0, 0))
                    }
                  >
                    Create a General Bet
                  </Button>
                  <Button
                    mx={2}
                    colorScheme="blue"
                    variant="outline"
                    onClick={() =>
                      router
                        .push('/dashboard/manage-bets/general-bets/view')
                        .then(() => window.scrollTo(0, 0))
                    }
                  >
                    View General Bets
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

export default GeneralBetsIndex;
