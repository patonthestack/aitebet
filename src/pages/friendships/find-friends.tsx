import { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Layout } from 'components/index';
import { useCollection } from '@nandorojo/swr-firestore';
import { useAuthUser } from '@/lib/useAuthUser';

export const FindFriendsPage: React.FC = () => {
  const { userData } = useAuthUser();

  const { data: allUsersData } = useCollection<any>('users');

  const { add } = useCollection<any>('friendships');

  const handleCreateFriendship = async (data: any) => {
    const dataObj = {
      senderId: userData.uid,
      senderName: userData.name,
      receiverId: data.uid,
      receiverName: data.name,
      status: 'pending',
    };
    await add(dataObj);
  };

  return (
    <Layout title="friends" description="friendship" canonical="/dashboard">
      <p>TEST</p>
      <Box bg="red" my={60}>
        {allUsersData &&
          allUsersData.map((user) => {
            return (
              <Button
                bg="blue"
                key={user.uid}
                onClick={() => {
                  handleCreateFriendship(user);
                }}
              >
                {user.name}
              </Button>
            );
          })}
      </Box>
    </Layout>
  );
};

export default FindFriendsPage;
