import React from 'react';
import NextLink from 'next/link';
import {
  Link,
  Heading,
  Divider,
  Flex,
  Box,
  Text,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { useAuth } from 'lib/auth';
import { useRouter } from 'next/router';

export const Footer: React.FC = () => {
  const { user, signinWithGoogle } = useAuth();
  const router = useRouter();

  return (
    <>
      <Flex mb={['80px', '60px', '40px']} mt={5} justify="center">
        <Text fontSize="sm">
          Copyright &copy; 2021 <Link href="https://aitebet.com">aiteBET</Link>
        </Text>
      </Flex>
    </>
  );
};
