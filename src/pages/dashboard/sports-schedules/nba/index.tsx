import { Layout, DashboardNav } from 'components/index';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'lib/auth';
import { useRequireAuth } from 'lib/useRequireAuth';
import {
  Box,
  Flex,
  Heading,
  Stack,
  SimpleGrid,
  List,
  ListItem,
  Avatar,
  Link,
} from '@chakra-ui/react';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import NextLink from 'next/link';
import { useDocument, useCollection } from '@nandorojo/swr-firestore';

const NbaIndex: React.FC = () => {
  const { user } = useAuth(); // firebase authentication
  const { auth } = useRequireAuth();
  const router = useRouter();

  // GET userData
  const { data: userData } = useDocument<any>(`users/${user?.uid}`, {
    listen: false,
  });

  // TODO once API keys are retrieved, replae the '1' with API key
  const nbaTeamsUrl =
    'https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4387';
  // NBA schedule is patreon only on sports DB site
  const nbaScheduleUrl =
    'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4387';

  const { data: nbaTeamsData } = useSWR<any, any>(`${nbaTeamsUrl}`, fetcher);

  const { data: nbaScheduleData } = useSWR<any, any>(
    `${nbaScheduleUrl}`,
    fetcher,
  );

  console.log('nbaTeamsData: ', nbaTeamsData);
  // console.log('nbaScheduleData: ', nbaScheduleData);

  return (
    <>
      {user && (
        <Layout
          title="NBA Schedule"
          description="NBA Schedule"
          canonical="/dashboard/sports-schedules/nba"
          hasNavbar
          hasFooter
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
                        NBA Teams
                      </Heading>
                      <Box textAlign="center">
                        <List>
                          {nbaTeamsData &&
                            nbaTeamsData.teams.map((team: any) => (
                              <ListItem key={team.strTeam} mb={2}>
                                {team.strTeam}
                                <Box cursor="pointer">
                                  <Link
                                    href={`https://${team.strWebsite}`}
                                    isExternal
                                  >
                                    <Avatar
                                      src={team.strTeamBadge}
                                      name={team.strTeam}
                                      size="md"
                                    />
                                  </Link>
                                </Box>
                              </ListItem>
                            ))}
                        </List>
                      </Box>
                    </Flex>
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
                        NBA Schedule
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

export default NbaIndex;
