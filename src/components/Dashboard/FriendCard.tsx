import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Spacer, usePrevious } from '@chakra-ui/react';
import { StarIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { useDocument } from '@nandorojo/swr-firestore';
import { FriendshipDataProps, UserDataProps } from 'types';

export interface FriendCardProps {
  friendData?: FriendshipDataProps;
}

const FriendCard: React.FC<FriendCardProps> = ({ friendData }) => {
  const [friendId, setFriendId] = useState<string>('');
  const [buttonValue, setButtonValue] = useState<string>('');

  const prevFriendId: string = usePrevious(friendId);

  const { update } = useDocument<any>(`friendships/${friendId}`);

  const onAcceptDeclineClick = (e: any, friend: FriendshipDataProps) => {
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

    return () => {
      setFriendId('');
    };
  }, [prevFriendId, friendId]);

  return (
    <Flex px="1em" alignItems="center">
      {/* stars icon to be replaced with user photo */}
      <StarIcon />
      <Button>
        <Box>
          <Box>{friendData.senderName}</Box>
          <Box fontSize="12px" textAlign="left">
            Username to go here (need to add field to DB)
          </Box>
        </Box>
      </Button>
      {friendData.status === 'pending' ? (
        <>
          <Button
            value="accept"
            colorScheme="teal"
            onClick={(e) => {
              onAcceptDeclineClick(e, friendData);
            }}
          >
            Accept
          </Button>
          <Button
            value="decline"
            colorScheme="red"
            onClick={(e) => {
              onAcceptDeclineClick(e, friendData);
            }}
          >
            Decline
          </Button>
        </>
      ) : null}

      <Spacer />
      {/* This icon below will link to the friends' detail page */}
      <InfoOutlineIcon />
    </Flex>
  );
};

export default FriendCard;
