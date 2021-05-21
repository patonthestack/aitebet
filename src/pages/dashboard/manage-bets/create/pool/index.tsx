import React, { MouseEvent, useRef, useState, useEffect } from 'react';
import { Layout, DashboardNav } from 'components/index';
import { useRouter } from 'next/router';
import { useAuthUser } from 'lib/useAuthUser';
import { useRequireAuth } from 'lib/useRequireAuth';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Select,
  SimpleGrid,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useDocument, useCollection } from '@nandorojo/swr-firestore';
import { useForm, Controller } from 'react-hook-form';
import firebase from 'firebase/app';
import { _sportsData } from '@/data/_sportsData';

const PoolIndexPage: React.FC = () => {
  const { userData } = useAuthUser();
  const toast = useToast();
  const router = useRouter();
  const selectRef = useRef();

  const [leagueId, setLeagueId] = useState<number>(null);

  const {
    register,
    handleSubmit,
    errors,
    formState,
    control,
    reset,
  } = useForm();

  // Get User Data
  const { update } = useDocument<any>(`users/${userData && userData.uid}`, {
    listen: false,
  });

  const onUpdateUser = async (docId) => {
    const dataObj = {
      books: firebase.firestore.FieldValue.arrayUnion(docId),
      modifiedAt: new Date().toISOString(),
    };

    update(dataObj);

    toast({
      title: 'Success!',
      description: "You've updated your profile!",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    router.push(`/dashboard`).then(() => window.scrollTo(0, 0));
  };

  const { add } = useCollection<any>('pools');

  const onCreatePool = async (data) => {
    const dataObj = {
      ...data,
      owner: userData.uid,
      modifiedAt: new Date().toISOString(),
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

  const handleLeagueSelect = (e: any) => {
    setLeagueId(e.target.value);
  };

  useEffect(() => {}, []);

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
                      <Controller
                        defaultValue=""
                        as={
                          <Select
                            w={['3xs', '3xs', 'xs']}
                            placeholder="Select League"
                            ref={selectRef}
                            variant="filled"
                            onClick={(e) => handleLeagueSelect(e)}
                          >
                            {_sportsData.map((league) => (
                              <option key={league.value} value={league.value}>
                                {league.label}
                              </option>
                            ))}
                          </Select>
                        }
                        name="league"
                        control={control}
                        rules={{ required: true }}
                      />

                      {errors.league && (
                        <FormErrorMessage>
                          Please Select a League
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
                  Update My Profile
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
