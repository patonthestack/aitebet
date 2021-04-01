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

const NflIndex: React.FC = () => {
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
                        NFL Schedule
                      </Heading>
                    </Flex>
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

export default NflIndex;
