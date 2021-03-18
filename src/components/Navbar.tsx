import NextLink from 'next/link';
import {
  Box,
  Button,
  Flex,
  Link,
  Avatar,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Stack,
  Text,
  AvatarBadge,
} from '@chakra-ui/react';
import { LoginButtons } from 'components/index';
import useSWR from 'swr';
// import fetcher from 'utils/fetcher';
import { useAuth } from 'lib/auth';

export const Navbar = () => {
  const { user, signout } = useAuth();

  // const { data: userData } = useSWR(`/api/user/${user?.uid}`, fetcher);

  return (
    <>
      <Flex
        as="header"
        position="fixed"
        display="inline-block"
        width="100%"
        bg="white"
        zIndex="2"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          py={4}
          maxW="100%"
          margin="0 auto"
          w="full"
          px={4}
          h="60px"
        >
          <Stack direction={'row'}>
            <Box fontSize={['sm', 'md', 'lg', 'xl']}>
              <Heading as="h1" fontSize="1.125em">
                <NextLink href="/dashboard">
                  <Link
                    _hover={{
                      color: 'gray.500',
                      textDecoration: 'none',
                    }}
                  >
                    {/* GGH{' '}
                    {process.env.NODE_ENV === 'development' &&
                      userRoleCheck(userData)} */}
                  </Link>
                </NextLink>
              </Heading>
            </Box>
            {/* <Box as="nav" fontSize={['sm', 'md', 'lg', 'xl']}>
            <NextLink href="/jobs" passHref>
              <Link
                _hover={{
                  color: 'gray.500',
                  textDecoration: 'none',
                }}
              >
                Jobs
              </Link>
            </NextLink>
          </Box>
          <Box as="nav" fontSize={['sm', 'md', 'lg', 'xl']}>
            <NextLink href="/rentals" passHref>
              <Link
                _hover={{
                  color: 'gray.500',
                  textDecoration: 'none',
                }}
              >
                Rentals
              </Link>
            </NextLink>
          </Box> */}
          </Stack>

          <Flex justify="center" alignItems="center" zIndex={3}>
            <Menu>
              {user ? (
                <>
                  <Stack direction="row" spacing={4}>
                    <Box mr={0} pr={0}>
                      <Avatar size="sm" name="N" bg="black">
                        <AvatarBadge
                          borderColor="papayawhip"
                          bg="black"
                          boxSize="1.25em"
                          padding={2}
                        >
                          <Text>2</Text>
                        </AvatarBadge>
                      </Avatar>
                    </Box>

                    {/* You can also change the borderColor and bg of the badge */}
                    <Box mr={3} pr={0}>
                      <Avatar size="sm" name="M" bg="black">
                        <AvatarBadge
                          borderColor="papayawhip"
                          bg="black"
                          boxSize="1.25em"
                          padding={2}
                        >
                          <Text fontSize="10px">13</Text>
                        </AvatarBadge>
                      </Avatar>
                    </Box>
                  </Stack>
                  <MenuButton mr={0} pr={0}>
                    <Avatar
                      size="sm"
                      // src={userData?.user.photoUrl}
                      // name={
                      //   userData?.user.firstName + ' ' + userData?.user.lastName
                      // }
                    />
                  </MenuButton>
                  <MenuList>
                    {/* <MenuGroup
                    title="DASHBOARD"
                    className="random-color-border-bottom"
                    fontSize="1em"
                    fontWeight="600"
                  >
                    <MenuItem>
                      <NextLink href="/dashboard">Welcome</NextLink>
                    </MenuItem>
                    {userData?.user?.userType === 'PARTICIPANT' && (
                      <>
                        <MenuItem>
                          <NextLink href="/dashboard/my-education">
                            My Education
                          </NextLink>
                        </MenuItem>
                        <MenuItem>
                          <NextLink href="/dashboard/my-documents">
                            My Documents
                          </NextLink>
                        </MenuItem>
                        <MenuItem>
                          <NextLink href="/dashboard/my-work-experience">
                            My Work Experience
                          </NextLink>
                        </MenuItem>
                      </>
                    )}
                    <MenuItem>
                      <NextLink href="/dashboard/my-events">My Events</NextLink>
                    </MenuItem>
                  </MenuGroup> */}
                    <MenuGroup
                      title="Profile"
                      className="random-color-border-bottom"
                      fontSize="1em"
                      fontWeight="600"
                    >
                      {/* <MenuItem>
                      <NextLink href={`/user/profile/${user?.uid}`}>
                        View Profile
                      </NextLink>
                    </MenuItem> */}

                      <MenuItem>
                        <NextLink href="/dashboard/edit-user">
                          Edit User Profile
                        </NextLink>
                      </MenuItem>

                      {/* {isOrganization(userData) && (
                        <MenuItem>
                          <NextLink href={`/dashboard/edit-company`} passHref>
                            Edit Organization Profile
                          </NextLink>
                        </MenuItem>
                      )}

                      {isExhibitor(userData) && (
                        <MenuItem>
                          <NextLink
                            href={`/dashboard/edit-exhibitor-company`}
                            passHref
                          >
                            Edit Company Profile
                          </NextLink>
                        </MenuItem>
                      )} */}
                    </MenuGroup>

                    <MenuGroup
                      title="SESSION"
                      className="random-color-border-bottom"
                      fontSize="1em"
                      fontWeight="600"
                    >
                      <MenuItem>
                        <NextLink href="/dashboard/change-password">
                          Change Password
                        </NextLink>
                      </MenuItem>
                      <MenuItem onClick={() => signout('/sign-in')}>
                        Sign Out
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </>
              ) : (
                // <>
                //   <NextLink href="/auth/sign-in" passHref>
                //     <Link>
                //       <Heading mr={8} fontSize="1.125em">
                //         Sign In
                //       </Heading>
                //     </Link>
                //   </NextLink>
                //   <NextLink href="/auth/sign-up" passHref>
                //     <Link>
                //       <Heading mr={8} fontSize="1.125em">
                //         Sign Up
                //       </Heading>
                //     </Link>
                //   </NextLink>
                // </>
                <LoginButtons />
              )}
            </Menu>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
