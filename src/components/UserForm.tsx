import React, { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDocument, useCollection } from '@nandorojo/swr-firestore';
import { useRouter } from 'next/router';
import Select from 'react-select';

import {
  FaLinkedinIn,
  FaInstagram,
  FaTumblr,
  FaTwitter,
  FaGithub,
  FaFacebook,
  FaYoutube,
  FaReddit,
  FaPinterest,
  FaTwitch,
  FaSoundcloud,
} from '@meronex/icons/fa';

import {
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
  SimpleGrid,
  Box,
  FormErrorMessage,
  Text,
  Heading,
  Divider,
  Select as ChakraSelect,
} from '@chakra-ui/react';

import { userProviderCheck } from 'helpers/index';

export interface Item {
  label: string;
  value: string;
}

export function UserForm({ userId }) {
  const toast = useToast();
  const router = useRouter();

  const selectRef = useRef();

  // Get User Data
  const { data: userData, update } = useDocument<any>(`users/${userId}`, {
    listen: false,
  });

  const {
    register,
    handleSubmit,
    errors,
    formState,
    control,
    reset,
  } = useForm();

  const onUpdateUser = async (data) => {
    const dataObj = {
      ...data,
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

  // This is for defaultValues
  useEffect(() => {
    reset(userData);
  }, [userData, reset]);

  return (
    <Box bg="white" p={4}>
      <Heading>Edit My Profile</Heading>
      <Divider mb={5} />
      <form onSubmit={handleSubmit(onUpdateUser)}>
        <Box my={5}>
          <Heading size="md">My Personal Information</Heading>
          <Divider borderColor="gray.800" />
        </Box>

        <Box>
          <SimpleGrid columns={[1, 2, 3]} spacing={5}>
            <Box my={1}>
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Text fontWeight="normal" name="name">
                  {userData?.name}
                </Text>

                {errors.name && <FormErrorMessage>Name Error</FormErrorMessage>}
              </FormControl>
            </Box>

            <Box my={1}>
              <FormControl>
                <FormLabel htmlFor="provider">Sign-in Provider</FormLabel>
                <Text fontWeight="normal" name="provider">
                  {userData?.provider}
                </Text>

                {errors.provider && (
                  <FormErrorMessage>Provider Error</FormErrorMessage>
                )}
              </FormControl>
            </Box>

            <Box my={1}>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Text fontWeight="normal" name="email">
                  {userData?.email}
                </Text>

                {errors.email && (
                  <FormErrorMessage>Email Error</FormErrorMessage>
                )}
              </FormControl>
            </Box>
          </SimpleGrid>
        </Box>

        <Box>
          <SimpleGrid
            columns={
              userProviderCheck(userData) === 'GOOGLE' ? [1, 1, 2] : [1, 1, 3]
            }
            spacing={5}
          >
            <Box my={5}>
              <FormControl isRequired>
                <FormLabel htmlFor="nickname">Nickname</FormLabel>
                <Input
                  defaultValue={userData?.nickname}
                  placeholder="eg, JuJu on that Meat, El Primo, Sacks in the City, etc."
                  name="nickname"
                  ref={register({
                    required: false,
                  })}
                />

                {errors.nickname && (
                  <FormErrorMessage>Nickname Error</FormErrorMessage>
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
  );
}
