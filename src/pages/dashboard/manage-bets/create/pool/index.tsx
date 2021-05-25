import React, { useRef, useState, useEffect } from 'react';
import { Layout } from 'components/index';
import { useRouter } from 'next/router';
import { useAuthUser } from 'lib/useAuthUser';
import format from 'date-fns/format';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Select as ChakraSelect,
  SimpleGrid,
  usePrevious,
  useToast,
  Stack,
} from '@chakra-ui/react';
import Select from 'react-select';
import { useDocument, useCollection } from '@nandorojo/swr-firestore';
import { useForm, Controller } from 'react-hook-form';
import firebase from 'firebase/app';
import { _leaguesData } from '@/data/_leaguesData';
import { useSportsDB } from '@/hooks/index';
import { SportsDbScheduleProps } from 'types';

const PoolIndexPage: React.FC = () => {
  const { userData } = useAuthUser();
  const toast = useToast();
  const router = useRouter();
  const selectRef = useRef();

  const [leagueId, setLeagueId] = useState<number>(0);
  const { scheduleData } = useSportsDB(leagueId);
  const [matchupsDropdownData, setMatchupsDropdownData] = useState<any>([]);

  const {
    register,
    handleSubmit,
    errors,
    formState,
    control,
    reset,
  } = useForm();

  const { add } = useCollection<any>('pools');

  const onCreatePool = async (data: any) => {
    const dataObj = {
      ...data,
      owner: userData.uid,
      createdAt: new Date().toISOString(),
    };

    add(dataObj);

    toast({
      title: 'Success!',
      description: "You've created a pool!",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    router.push(`/dashboard/manage-bets`);
  };

  // handle league dropdown
  const handleLeagueSelect = (e: any) => {
    setLeagueId(e.target.value);
  };

  // handle multi select dropdown
  const handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  return (
    <>
      {userData && (
        <Layout
          title="Create Pool"
          description="Create Pool"
          canonical="/dashboard/manage-bets/create/pool"
          hasNavbar
          hasFooter
        >
          <Box bg="white" p={4}>
            <Heading>Create a Pool</Heading>
            <Divider mb={5} />
            <form onSubmit={handleSubmit(onCreatePool)}>
              <Box my={5}>
                <Heading size="md">Pool Information</Heading>
                <Divider borderColor="gray.800" />
              </Box>

              <Box>
                <SimpleGrid columns={[1, 2, 3]} spacing={5}>
                  <Box my={1}>
                    <FormControl>
                      <FormLabel htmlFor="league">League</FormLabel>
                      <Stack w="sm">
                        <Controller
                          defaultValue=""
                          as={
                            <ChakraSelect
                              w={['3xs', '3xs', 'xs']}
                              placeholder="Select League"
                              ref={selectRef}
                              variant="filled"
                              onClick={(e) => handleLeagueSelect(e)}
                            >
                              {_leaguesData.map((league) => (
                                <option key={league.value} value={league.value}>
                                  {league.label}
                                </option>
                              ))}
                            </ChakraSelect>
                          }
                          name="league"
                          control={control}
                          rules={{ required: true }}
                        />
                      </Stack>

                      {errors.league && (
                        <FormErrorMessage>
                          Please Select a League
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </Box>
                  <Box my={1}>
                    <FormControl>
                      <FormLabel htmlFor="matchups">Matchups</FormLabel>
                      <Controller
                        defaultValue=""
                        as={Select}
                        isMulti
                        onChange={handleChange}
                        name="league"
                        options={leagueId > 0 ? scheduleData : []}
                        control={control}
                        rules={{ required: true }}
                      />

                      {errors.league && (
                        <FormErrorMessage>
                          Please Select a Game
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </Box>
                </SimpleGrid>
              </Box>

              <FormControl mt={4}>
                <Button
                  onClick={() => router.push('/dashboard')}
                  type="button"
                  size="lg"
                  backgroundColor="gray.200"
                  color="black"
                  mr="10px"
                  fontWeight="medium"
                  _hover={{ bg: 'gray.100', color: 'gray.700' }}
                  _active={{
                    bg: 'gray.100',
                    transform: 'scale(0.95)',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  backgroundColor="gray.900"
                  color="white"
                  fontWeight="medium"
                  _hover={{ bg: 'gray.700' }}
                  _active={{
                    bg: 'gray.800',
                    transform: 'scale(0.95)',
                  }}
                  isLoading={formState.isSubmitting}
                >
                  Create Pool
                </Button>
              </FormControl>
            </form>
          </Box>
        </Layout>
      )}
    </>
  );
};

export default PoolIndexPage;
