import React from 'react';
import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faDollarSign,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { Box, Flex, VStack, Link, Text } from '@chakra-ui/react';

export const BottomNavigation: React.FC<any> = () => {
  return (
    <>
      <Flex
        justifyContent="space-evenly"
        pos="fixed"
        w="100%"
        zIndex={2}
        bottom={0}
        borderTop="1px"
        borderColor="gray.300"
        py={3}
        color="gray.600"
        bg="white"
      >
        <Box cursor="pointer">
          <NextLink href="/">
            <VStack>
              <FontAwesomeIcon icon={faHome} size="2x" height="30px" />
              <span>Home</span>
            </VStack>
          </NextLink>
        </Box>
        <Box cursor="pointer">
          <NextLink href="/betslip">
            <VStack>
              <FontAwesomeIcon icon={faDollarSign} size="2x" height="30px" />
              <span>aitebet</span>
            </VStack>
          </NextLink>
        </Box>
        <Box cursor="pointer">
          <NextLink href="/dashboard">
            <VStack>
              <FontAwesomeIcon icon={faUser} size="2x" height="30px" />
              <Text size="sm">Dashboard</Text>
            </VStack>
          </NextLink>
        </Box>
        <Box cursor="pointer">
          <NextLink href="/user">
            <VStack>
              <FontAwesomeIcon icon={faBars} size="2x" height="30px" />
              <span>Profile</span>
            </VStack>
          </NextLink>
        </Box>
      </Flex>
    </>
  );
};
