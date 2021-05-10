import React from 'react';
import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { Box, Flex, VStack, Link } from '@chakra-ui/react';

export const BottomNavigation = () => {
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
        <Box>
          <NextLink href="/">
            <VStack>
              <FontAwesomeIcon icon={faHome} size="2x" />
              <div>Home</div>
            </VStack>
          </NextLink>
        </Box>
        <Box>
          <NextLink href="/betslip">
            <VStack>
              <FontAwesomeIcon icon={faDollarSign} size="2x" />
              <span>aitebet</span>
            </VStack>
          </NextLink>
        </Box>
        <Box>
          <NextLink href="/dashboard">
            <VStack>
              <FontAwesomeIcon icon={faUser} size="2x" />
              <span>Dashboard</span>
            </VStack>
          </NextLink>
        </Box>
      </Flex>
    </>
  );
};
