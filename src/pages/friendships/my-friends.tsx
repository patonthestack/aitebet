import { useEffect, useState } from 'react';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import { Layout } from 'components/index';
import { useDocument, useCollection } from '@nandorojo/swr-firestore';
import { useAuthUser } from '@/lib/useAuthUser';
import FriendCard from '@/components/Dashboard/FriendCard';

export const MyFriendsPage: React.FC = () => {
  const { userData } = useAuthUser();

  const { data: friendRequestsSent } = useCollection<any>('friendships', {
    where: [['senderId', '==', userData && userData.uid]],
  });

  const { data: friendRequestsReceived } = useCollection<any>('friendships', {
    where: [
      ['receiverId', '==', userData && userData.uid],
      ['status', '==', 'pending'],
    ],
    listen: true,
  });

  const { data: friendList } = useCollection<any>('friendships', {
    where: [
      ['receiverId', '==', userData && userData.uid],
      ['status', '==', 'accepted'],
    ],
  });

  const [friendId, setFriendId] = useState<string>('');
  const [buttonValue, setButtonValue] = useState<string>('');

  const { update } = useDocument<any>(`friendships/${friendId}`);

  const handleAcceptFriendRequest = async () => {
    const dataObj = {
      status: 'accepted',
    };
    await update(dataObj);
  };

  const handleDeclineFriendRequest = async () => {
    const dataObj = {
      status: 'declined',
    };
    await update(dataObj);
  };

  console.log('acceptFriendId', friendId);
  console.log('buttonValue', buttonValue);

  useEffect(() => {
    if (buttonValue === 'accept' && friendId) {
      handleAcceptFriendRequest();
    }
    if (buttonValue === 'decline' && friendId) {
      handleDeclineFriendRequest();
    }
  }, [buttonValue, friendId]);

  return (
    <Layout title="friends" description="friendship" canonical="/dashboard">
      <Box spacing={10}>
        <Heading as="h2" size="lg">
          Pending Friend Requests
        </Heading>
        <Box>
          {friendRequestsSent &&
            friendRequestsSent.map((friend) => {
              return(
                <FriendCard
                  name={friend.receiverName}
                  username="username"
                  key={friend.receiverId}
                  friendshipStatus={friend.status}
                />
              )
            })}
        </Box>
        <Heading as="h2" size="lg">
          All Friends
        </Heading>
        <VStack align="stretch">
          {friendList &&
            friendList.map((friend) => (
              <FriendCard
                name={friend.senderName}
                username="username"
                key={friend.senderId}
                friendshipStatus={friend.status}
              />
            ))}
        </VStack>
      </Box>
    </Layout>
  );
};

export default MyFriendsPage;

// <Box key={friend.senderId}>
//   {friend.senderName}
//   <Button
//     value="accept"
//     onClick={(e) => {
//       setFriendId(friend.id);
//       setButtonValue('accept');
//     }}
//   >
//     Accept
//   </Button>
//   <Button
//     value="decline"
//     onClick={(e) => {
//       setFriendId(friend.id);
//       setButtonValue('decline');
//     }}
//   >
//     Decline
//   </Button>
// </Box>;
