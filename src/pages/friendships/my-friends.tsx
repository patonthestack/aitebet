import { Box, Heading, VStack } from '@chakra-ui/react';
import { Layout } from 'components/index';
import { useCollection } from '@nandorojo/swr-firestore';
import { useAuthUser } from '@/lib/useAuthUser';
import FriendCard from '@/components/Dashboard/FriendCard';
import { FriendshipDataProps } from 'types';
import { useUsers } from '@/hooks/useUsers';

export const MyFriendsPage: React.FC = () => {
  const { friendRequestsSent, friendRequestsReceived, friendsList } =
    useUsers();

  return (
    <Layout title="friends" description="friendship" canonical="/dashboard">
      <Box spacing={10}>
        <Heading as="h2" size="lg">
          Pending Friend Requests
        </Heading>
        <Box>
          {friendRequestsReceived &&
            friendRequestsReceived.map((friend: FriendshipDataProps) => {
              return <FriendCard friendData={friend} key={friend.senderId} />;
            })}
        </Box>
        <Heading as="h2" size="lg">
          All Friends
        </Heading>
        <VStack align="stretch">
          {friendsList &&
            friendsList.map((friend, i) => (
              <FriendCard friendData={friend} key={i} />
            ))}
        </VStack>
      </Box>
    </Layout>
  );
};

export default MyFriendsPage;
