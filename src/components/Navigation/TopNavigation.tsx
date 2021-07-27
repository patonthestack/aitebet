import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';

export const TopNavigation: React.FC<any> = () => {
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
          <Heading as="h1" size="md">
            AITE BET
          </Heading>
        </Box>
      </Flex>
    </>
  );
};
