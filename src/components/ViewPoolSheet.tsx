import React, { ChangeEvent, FC, useState } from 'react';
import {
  Box,
  Heading,
  Divider,
  Text,
  Button,
  Input,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';

import { _leaguesData } from '@/data/_leaguesData';
import { LabelValue, PoolDataProps, UserDataProps } from 'types/index';
import { Table, Td, Th, Tr } from './Table';
import SkeletonDocumentsTable from './SkeletonDocumentsTable';
import { ViewMatchup } from '@/components/index';
import { useForm } from 'react-hook-form';
import { useDocument } from '@nandorojo/swr-firestore';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { usePools } from 'hooks/usePools';
import { useEffect } from 'react';

export interface ViewPoolSheetProps {
  userData: UserDataProps;
  poolData: PoolDataProps;
}

export const ViewPoolSheet: FC<ViewPoolSheetProps> = ({
  userData,
  poolData,
}) => {
  const { handleSubmit, errors, formState, control, register } = useForm();
  const toast = useToast();
  const router = useRouter();
  const [acceptedUsersArray, setAcceptedUsersArray] = useState<String[]>(
    poolData?.acceptedUsers,
  );

  const { data: userPoolData, set } = useDocument<any>(
    `users/${userData?.uid}/userPools/${poolData?.id}`,
  );
  const { updatePoolData } = usePools(poolData?.id);
  const onSubmitPicks = (data) => {
    console.log({ data });
    const submissionsArray =
      userPoolData?.submissions?.length > 0 ? userPoolData.submissions : [];
    const dataObj = {
      ...data,
      picks: picksArray,
    };

    submissionsArray.push(dataObj);
    set({ submissions: submissionsArray });

    if (acceptedUsersArray.indexOf(userData?.uid) === -1) {
      acceptedUsersArray.push(userData?.uid);
      updatePoolData({ acceptedUsers: acceptedUsersArray });
    }

    toast({
      title: 'Success!',
      description: "aite BET! You've submitted your picks!",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    router.back();
  };

  const picksArray = [];
  const onHandleRadioChange = (
    e: ChangeEvent<HTMLInputElement>,
    eventId?: string | number,
  ) => {
    if (picksArray.length > 0) {
      picksArray.forEach((pick, i) => {
        if (pick.eventId === eventId) {
          picksArray.splice(i, 1);
        }
      });
    }
    picksArray.push({
      eventId: eventId,
      teamId: e.target.value,
    });
  };

  useEffect(() => {
    setAcceptedUsersArray(poolData?.acceptedUsers);
  }, [poolData]);

  return (
    <Box>
      <Box my={5}>
        <Heading my={3} size="md">
          {poolData && poolData.poolName}
        </Heading>
        <Divider borderColor="grayAlpha.300" />
      </Box>
      <form onSubmit={handleSubmit(onSubmitPicks)}>
        <Box px={{ base: 0, md: 8 }}>
          {poolData && poolData.matchups?.length > 0 ? (
            <Table boxShadow="none" w="full">
              <thead>
                <Tr
                  display={{ base: 'none', md: 'table-row' }}
                  h="7"
                  borderBottomColor="gray.600"
                  backgroundColor="transparent"
                >
                  <Th color="gray.600" width="50px">
                    Matchup
                  </Th>
                  <Th color="gray.600" width="20px">
                    Teams
                  </Th>
                </Tr>
              </thead>
              <tbody>
                {!poolData ? (
                  <SkeletonDocumentsTable />
                ) : (
                  poolData.matchups?.map((matchup: LabelValue) => {
                    return (
                      <React.Fragment key={matchup.value}>
                        <Tr
                          h="auto"
                          bg="transparent"
                          borderBottomWidth={{ base: '1px', md: 0 }}
                          borderBottomColor="gray.400"
                          my={{ base: 2.5, md: 0 }}
                          boxShadow={{
                            base: '0 2px 3px rgba(0, 0, 0, .2)',
                            md: 'none',
                          }}
                          display={{ base: 'block', md: 'table-row' }}
                        >
                          <Td
                            p="2"
                            borderBottom="none"
                            // data-label="League"
                            _before={{
                              '@media (max-width:767px)': {
                                content: 'attr(data-label)',
                                display: 'inline-block',
                                fontWeight: 'bold',
                              },
                            }}
                            display={{
                              base: 'block',
                              md: 'table-cell',
                            }}
                          >
                            <Box>
                              <Text
                                as="span"
                                float={{ base: 'right', md: 'none' }}
                              >
                                {matchup.label.substring(
                                  0,
                                  matchup.label.indexOf('@'),
                                )}
                              </Text>
                            </Box>
                            <Box>
                              <Text
                                as="span"
                                float={{ base: 'right', md: 'none' }}
                              >
                                {matchup.label.substring(
                                  matchup.label.indexOf('@') + 1,
                                )}
                              </Text>
                            </Box>
                          </Td>
                          <Td
                            p="2"
                            borderBottom="none"
                            _before={{
                              '@media (max-width:767px)': {
                                content: 'attr(data-label)',
                                display: 'inline-block',
                                fontWeight: 'bold',
                              },
                            }}
                            display={{
                              base: 'block',
                              md: 'table-cell',
                            }}
                          >
                            <FormControl isRequired>
                              <ViewMatchup
                                eventId={matchup.value}
                                onHandleRadioChange={(e) =>
                                  onHandleRadioChange(e, matchup.value)
                                }
                              ></ViewMatchup>
                            </FormControl>
                          </Td>
                        </Tr>
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </Table>
          ) : (
            <Text my={5}>No pool entries entries found</Text>
          )}
          <Box my={5}>
            <FormControl isRequired>
              {/* <FormLabel htmlFor="testing">Nickname</FormLabel> */}
              <Input
                defaultValue={userData?.nickname}
                placeholder="eg, JuJu on that Meat, El Primo, Sacks in the City, etc."
                name="nickname"
                ref={register({
                  required: false,
                })}
              />

              {errors.nickname && (
                <FormErrorMessage>Test Error</FormErrorMessage>
              )}
            </FormControl>
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
              Submit Picks
            </Button>
          </FormControl>
        </Box>
      </form>
    </Box>
  );
};
