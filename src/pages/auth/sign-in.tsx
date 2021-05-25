// @ts-nocheck
import { Box, Flex, Stack, Heading } from '@chakra-ui/react';
import { LoginButtons } from '@/components/index';

const SignInPage = () => {
  return (
    <Flex align="center" justify="center" h="100vh" backgroundColor="gray.100">
      <Stack
        backgroundColor="white"
        borderRadius={[0, 8]}
        px={8}
        py={12}
        shadow={[null, 'md']}
        spacing={4}
        w="md"
      >
        <Flex justify="center" textAlign="center">
          <Box>
            <Heading size="md" fontWeight="medium">
              aite BET!
            </Heading>
          </Box>
        </Flex>
        <Flex>
          <Box>
            <LoginButtons />
          </Box>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default SignInPage;
