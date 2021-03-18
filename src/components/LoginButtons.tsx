import { Button, Stack } from '@chakra-ui/react';
import { FcGoogle } from '@meronex/icons/fc';
import { useAuth } from 'lib/auth';
import { useRouter } from 'next/router';

export const LoginButtons = () => {
  const auth = useAuth();
  const router = useRouter();

  // const handleSignIn = () => {
  //   if (user) {
  //     router.push('/dashboard');
  //   } else {
  //     router.push('/sign-in');
  //   }
  // };

  return (
    <Stack direction={['column', 'row']}>
      <Button
        onClick={() => auth.signinWithGoogle()}
        backgroundColor="white"
        color="gray.900"
        variant="outline"
        fontWeight="medium"
        leftIcon={<FcGoogle />}
        mt={4}
        mb={4}
        _hover={{ bg: 'gray.100' }}
        _active={{
          bg: 'gray.100',
          transform: 'scale(0.95)',
        }}
      >
        Sign in with Google
      </Button>
    </Stack>
  );
};
