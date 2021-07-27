import { Flex, Heading, Text, Avatar, Box } from '@chakra-ui/react';
import { useAuth } from 'lib/auth';
import { useDocument } from '@nandorojo/swr-firestore';
import { useRequireAuth } from 'lib/useRequireAuth';
import { Layout, DashboardNav, UserForm } from 'components/index';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

export const UserIndexPage: React.FC = () => {
  const auth = useRequireAuth();
  const { user } = useAuth();

  // Get User Data
  const { data: userData, loading: userLoading } = useDocument<any>(
    `users/${user?.uid}`,
    {
      listen: false,
    },
  );

  if (userLoading) {
    return <p>loading....</p>;
  }

  return (
    <>
      {user && auth && (
        <Layout
          title="Edit My Profile"
          description="Edit My Profile"
          canonical="/dashboard/edit-user"
          hasNavbar
          hasFooter
          isActive={userData?._isActive}
          isBanned={userData?._isBanned}
        >
          <Flex>
            <Box
              w={['0px', '300px', '300px']}
              position="fixed"
              display={['none', 'none', 'block']}
              top="60px"
              h="100%"
              bg="green.300"
            >
              <DashboardNav />
            </Box>

            <Box
              flex="1"
              ml={['10px', '10px', '320px']}
              mr={['10px', '10px', '20px']}
              display="block"
              top="60px"
            >
              <Flex
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                mt={20}
              >
                <Flex direction="column" align={['left', 'center']} my="40px">
                  <NextLink href="/avatarupload">
                    <a>
                      <Avatar
                        w={['3rem', '6rem']}
                        h={['3rem', '6rem']}
                        mb={4}
                        src={userData?.photoUrl}
                        name={userData?.name}
                      />
                    </a>
                  </NextLink>
                  <Heading>{userData?.name}</Heading>
                  <Text>{userData?.email}</Text>
                </Flex>
              </Flex>

              <UserForm userId={user?.uid} />
            </Box>
          </Flex>
        </Layout>
      )}
    </>
  );
};

export default UserIndexPage;
