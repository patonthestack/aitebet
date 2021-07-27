import React from 'react';
import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { StarIcon, InfoOutlineIcon } from '@chakra-ui/icons';

interface Props {
  name: string;
  username: string;
  friendshipStatus: string;
}

const FriendCard: React.FC<Props> = ({ name, username, friendshipStatus }) => {
  const router = useRouter();
  
  return (
    <Flex px="1em" alignItems="center">
      {/* stars icon to be replaced with user photo */}
      <StarIcon />
      <Button>
        <Box>
          <Box>{name}</Box>
          <Box fontSize="12px" textAlign="left">
            {username}
          </Box>
        </Box>
      </Button>
      {friendshipStatus === 'pending' ? (
        <>
          <Button
            value="accept"
            colorScheme="teal"
            // onClick={(e) => {
            //   setFriendId(friend.id);
            //   setButtonValue('accept');
            // }}
          >
            Accept
          </Button>
          <Button
            value="decline"
            colorScheme="red"
            // onClick={(e) => {
            //   setFriendId(friend.id);
            //   setButtonValue('decline');
            // }}
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
