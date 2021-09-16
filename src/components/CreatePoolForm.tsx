import React, { FC, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCollection } from '@nandorojo/swr-firestore';
import { useRouter } from 'next/router';
import Select from 'react-select';

import {
  FormControl,
  FormLabel,
  Button,
  useToast,
  SimpleGrid,
  Box,
  FormErrorMessage,
  Heading,
  Divider,
  Select as ChakraSelect,
} from '@chakra-ui/react';

import { _leaguesData } from '@/data/_leaguesData';
import { UserDataProps } from 'types/index';
import { useSportsDB, useUsers } from '@/hooks/index';

export interface CreatePoolFormProps {
  userData: UserDataProps;
}

export const CreatePoolForm: FC<CreatePoolFormProps> = ({ userData }) => {
  const toast = useToast();
  const router = useRouter();
  const selectRef = useRef();

  const [leagueId, setLeagueId] = useState<number>(0);
  const [leagueName, setLeagueName] = useState<string>();
  const { scheduleData } = useSportsDB({ leagueId: leagueId });
  const { multiSelectFriendsList } = useUsers();

  const { handleSubmit, errors, formState, control } = useForm();

  const { add } = useCollection<any>(userData ? 'pools' : null);

  const onCreatePool = async (data: any) => {
    const dataObj = {
      ...data,
      leagueName: leagueName,
      owner: userData.uid,
      createdAt: new Date().toISOString(),
    };

    await add(dataObj)
      .then(() => {
        toast({
          title: 'Success!',
          description: "aite BET, you've created a pool!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        router.push(`/dashboard/manage-bets`);
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: `Error creating pool: ${error}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  // handle league dropdown
  const handleLeagueSelect = (e: any) => {
    setLeagueId(e.target.value);
    setLeagueName(e.target[e.target.selectedIndex].label);
  };

  // handle multi select dropdown
  const handleMutliSelectChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  return (
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
              <FormControl isRequired>
                <FormLabel htmlFor="leagueId">League</FormLabel>
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
                        <option
                          key={league.value}
                          value={league.value}
                          label={league.label}
                          // onClick={() => handleLeagueSelect(league)}
                        >
                          {league.label}
                        </option>
                      ))}
                    </ChakraSelect>
                  }
                  name="leagueId"
                  control={control}
                  rules={{ required: true }}
                />

                {errors.league && (
                  <FormErrorMessage>Please Select a League</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box my={1}>
              <FormControl isRequired>
                <FormLabel htmlFor="matchups">Matchups</FormLabel>
                <Controller
                  defaultValue=""
                  placeholder="Select Matchups"
                  as={Select}
                  isMulti
                  onChange={handleMutliSelectChange}
                  name="matchups"
                  options={leagueId > 0 ? scheduleData : []}
                  control={control}
                  rules={{ required: true }}
                />

                {errors.matchups && (
                  <FormErrorMessage>Please Select a Matchup</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box my={1}>
              <FormControl isRequired>
                <FormLabel htmlFor="invitedUsers">Invite Friends</FormLabel>
                <Controller
                  defaultValue=""
                  placeholder="Invite Friends"
                  as={Select}
                  isMulti
                  onChange={handleMutliSelectChange}
                  name="invitedUsers"
                  options={multiSelectFriendsList}
                  control={control}
                  rules={{ required: true }}
                />

                {errors.matchups && (
                  <FormErrorMessage>Select Friends to Invite</FormErrorMessage>
                )}
              </FormControl>
            </Box>
          </SimpleGrid>
        </Box>

        <FormControl mt={4}>
          <Button
            onClick={() => router.back()}
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
  );
};
