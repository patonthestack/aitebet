import React from 'react';
import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { useAuthUser } from '@/lib/useAuthUser';

export const TopNavigation: React.FC<any> = () => {
  const { signout } = useAuthUser();
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
        <Center>
          <Heading as="h1" size="md">
            AITE BET
          </Heading>
        </Center>
        <Box pos="fixed" right={12} onClick={signout} cursor="pointer">
          <Text>Logout</Text>
        </Box>
      </Flex>
    </>
  );
};
