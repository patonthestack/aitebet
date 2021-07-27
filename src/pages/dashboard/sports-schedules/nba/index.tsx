import { Layout, DashboardNav, CarouselAvatar } from 'components/index';
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
  Image,
  VStack,
  StackDivider,
} from '@chakra-ui/react';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import format from 'date-fns/format';
import { useDocument, useCollection } from '@nandorojo/swr-firestore';

const NbaIndex: React.FC = () => {
  const { user } = useAuth(); // firebase authentication
  const { auth } = useRequireAuth();
  const router = useRouter();

  // GET userData
  const { data: userData } = useDocument<any>(`users/${user?.uid}`, {
    listen: false,
  });

  const nbaTeamsUrl = `https://www.thesportsdb.com/api/v1/json/${process.env.NEXT_PUBLIC_SPORTS_DB_KEY}/lookup_all_teams.php?id=4387`;
  const nbaScheduleUrl = `https://www.thesportsdb.com/api/v1/json/${process.env.NEXT_PUBLIC_SPORTS_DB_KEY}/eventsnextleague.php?id=4387`;
  const nbaLiveScores = `https://www.thesportsdb.com/api/v2/json/${process.env.NEXT_PUBLIC_SPORTS_DB_KEY}/livescore.php?l=4387`;

  const { data: nbaTeamsData } = useSWR<any, any>(`${nbaTeamsUrl}`, fetcher);

  const { data: nbaScheduleData } = useSWR<any, any>(
    `${nbaScheduleUrl}`,
    fetcher,
  );

  const { data: nbaLiveScoresData } = useSWR<any, any>(
    `${nbaLiveScores}`,
    fetcher,
  );

  console.log('nbaTeamsData: ', nbaTeamsData);
  console.log('nbaScheduleData: ', nbaScheduleData);
  console.log('nbaLiveScoresData: ', nbaLiveScoresData);

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
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
              >
                <Box h="40px" bg="yellow.200">
                  1
                </Box>
                <Box h="40px" bg="tomato">
                  2
                </Box>
                <Box h="40px" bg="pink.100">
                  3
                </Box>
              </VStack>
              <Box maxW={['580px', '780px', '1280px']} padding={6}>
                <CarouselAvatar displayData={nbaTeamsData?.teams} />
              </Box>
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
                        Schedule
                      </Heading>
                      <Box textAlign="center">
                        <List>
                          {nbaScheduleData &&
                            nbaScheduleData.events?.map((event: any) => (
                              <ListItem key={event.strEvent} mb={2}>
                                <Box>{event.strEvent}</Box>
                                <Box mb={2}>
                                  {format(
                                    new Date(event.strTimestamp),
                                    'MMMM dd, yyyy h:mm aa',
                                  )}
                                </Box>

                                <Box align="center" mb={3}>
                                  <Image
                                    src={event.strThumb}
                                    boxSize="3xs"
                                    minW="sm"
                                    alt={event.strEvent}
                                  />
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
                        Live Scores
                      </Heading>
                      <SimpleGrid>
                        <Box textAlign="center">
                          <List>
                            {nbaLiveScoresData &&
                              nbaLiveScoresData.events?.map((event: any) => (
                                <ListItem key={event.idEvent} mb={2}>
                                  <Box>
                                    Home: {event.strHomeTeam} -{' '}
                                    {event.intHomeScore} Away:{' '}
                                    {event.strAwayTeam} - {event.intAwayScore}
                                  </Box>
                                </ListItem>
                              ))}
                          </List>
                        </Box>
                      </SimpleGrid>
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
