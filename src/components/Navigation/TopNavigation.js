import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

export const TopNavigation = () => {
  return (
    <>
      <Flex
        justifyContent="space-evenly"
        pos="fixed"
        w="100%"
        zIndex={2}
        borderBottom="1px"
        borderColor="gray.300"
        py={3}
        color="gray.600"
        bg="white"
      >
        <Box>
          <h1>AITE BET</h1>
        </Box>
      </Flex>
    </>
  );
};
