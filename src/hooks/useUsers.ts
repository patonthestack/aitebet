import { useAuthUser } from '@/lib/useAuthUser';
import { FriendshipDataProps, LabelValue, UserDataProps } from 'types';
import { revalidateCollection, useCollection } from '@nandorojo/swr-firestore';
import { useEffect, useState } from 'react';

export const useUsers = () => {
  const { userData } = useAuthUser();

  const { data: friendRequestsSent } = useCollection<FriendshipDataProps>(
    'friendships',
    {
      where: [
        ['senderId', '==', userData && userData.uid],
        ['status', '==', 'pending'],
      ],
      listen: false,
    },
  );

  const { data: friendRequestsReceived } = useCollection<FriendshipDataProps>(
    'friendships',
    {
      where: [
        ['receiverId', '==', userData && userData.uid],
        ['status', '==', 'pending'],
      ],
      listen: false,
    },
  );

  const { data: acceptedSentRequests } = useCollection<FriendshipDataProps>(
    'friendships',
    {
      where: [
        ['senderId', '==', userData && userData.uid],
        ['status', '==', 'accepted'],
      ],
      listen: false,
    },
  );

  const { data: acceptedReceivedRequests } = useCollection<FriendshipDataProps>(
    'friendships',
    {
      where: [
        ['receiverId', '==', userData && userData.uid],
        ['status', '==', 'accepted'],
      ],
      listen: false,
    },
  );

  const { data: allUsersData, loading: allUsersDataLoading } =
    useCollection<UserDataProps>('users', {
      listen: false,
    });

  const friendsUserDataList = Array.from(new Set<UserDataProps>());
  const multiSelectFriendsList = Array.from(new Set<LabelValue>());
  const friendsList = Array.from(new Set<FriendshipDataProps>());
  const fetchAllFriendsData = async () => {
    if (!allUsersDataLoading) {
      allUsersData.map((user: UserDataProps) => {
        acceptedSentRequests.map((sentTo) => {
          if (user.uid == sentTo.receiverId) {
            friendsList.push(sentTo);
            friendsUserDataList.push(user);
            multiSelectFriendsList.push({
              label: `${user.name || user.nickname}`,
              value: `${user.uid}`,
            });
          }
        });
        acceptedReceivedRequests.map((receivedFrom) => {
          if (user.uid == receivedFrom.senderId) {
            friendsList.push(receivedFrom);
            friendsUserDataList.push(user);
            multiSelectFriendsList.push({
              label: `${user.name || user.nickname}`,
              value: `${user.uid}`,
            });
          }
        });
      });
    }
  };

  useEffect(() => {
    fetchAllFriendsData();
  }, [
    allUsersDataLoading,
    allUsersData,
    acceptedSentRequests,
    acceptedReceivedRequests,
    friendsList,
    friendsUserDataList,
    multiSelectFriendsList,
  ]);

  return {
    friendRequestsSent,
    friendRequestsReceived,
    allUsersData,
    friendsList,
    friendsUserDataList,
    multiSelectFriendsList,
  };
};
