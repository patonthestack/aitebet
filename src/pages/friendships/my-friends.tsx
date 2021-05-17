import { useEffect, useState } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { Layout } from 'components/index';
import { useDocument, useCollection } from '@nandorojo/swr-firestore';
import { useAuthUser } from '@/lib/useAuthUser';
import { usePrevious } from '@/hooks/index';

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

  const [friendId, setFriendId] = useState<string>('');
  const [buttonValue, setButtonValue] = useState<string>('');

  const prevFriendId: string = usePrevious(friendId);

  const { update } = useDocument<any>(`friendships/${friendId}`);

  const onAcceptDeclineClick = (e: any, friend: any) => {
    e.preventDefault();
    setFriendId(friend.id);
    setButtonValue(e.target.value);
  };

  const handleFriendRequest = async () => {
    const dataObj = {
      status: buttonValue === 'accept' ? 'accepted' : 'declined',
    };
    await update(dataObj);
  };

  useEffect(() => {
    if (typeof prevFriendId !== 'undefined') {
      if (prevFriendId !== friendId) {
        handleFriendRequest();
      }
    }
  }, [prevFriendId, friendId]);

  return (
    <Layout title="friends" description="friendship" canonical="/dashboard">
      <Box bg="red" mt={60} spacing={10}>
        <Heading>Friend Requests Sent</Heading>
        <Box>
          {friendRequestsSent &&
            friendRequestsSent.map((friend) => (
              <Box key={friend.receiverId}>{friend.receiverName}</Box>
            ))}
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
                    onAcceptDeclineClick(e, friend);
                  }}
                >
                  Accept
                  {friend.id}
                </Button>
                <Button
                  value="decline"
                  onClick={(e) => {
                    onAcceptDeclineClick(e, friend);
                  }}
                >
                  Decline
                  {friend.id}
                </Button>
              </Box>
            ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default MyFriendsPage;
