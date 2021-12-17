import { useEffect, useState } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { Layout } from 'components/index';
import { useDocument, useCollection } from '@nandorojo/swr-firestore';
import { useAuthUser } from '@/lib/useAuthUser';

export const friendsList: React.FC = () => {
  const { userData } = useAuthUser();

  const { data: friendRequestsSent } = useCollection<any>('friendships', {
    where: [
      ['senderId', '==', userData && userData.uid],
      ['status', '==', 'accepted'],
    ],
  });

  const { data: friendRequestsReceived } = useCollection<any>('friendships', {
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
      <Box bg="red" mt={60} spacing={10}>
        <Heading>Friend Requests Sent</Heading>
        <Box>
          {friendRequestsSent &&
            friendRequestsSent.map((friend) => {
              return <Box key={friend.receiverId}>{friend.receiverName}</Box>;
            })}
        </Box>
        <Heading>Friend Requests Received</Heading>
        <Box>
          {friendRequestsReceived &&
            friendRequestsReceived.map((friend) => (
              <Box key={friend.senderId}>
                {friend.senderName}
                <Button
                  value="accept"
                  onClick={(e) => {
                    setFriendId(friend.id);
                    setButtonValue('accept');
                  }}
                >
                  Accept
                </Button>
                <Button
                  value="decline"
                  onClick={(e) => {
                    setFriendId(friend.id);
                    setButtonValue('decline');
                  }}
                >
                  Decline
                </Button>
              </Box>
            ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default friendsList;
