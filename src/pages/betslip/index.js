import React from 'react';
import {
  Box,
  Text,
  Link,
  Input,
  VStack,
  StackDivider,
  Flex,
  Spacer,
  Center,
} from '@chakra-ui/react';
import { Container, Layout } from 'components/index';
import NextLink from 'next/link';
import { StarIcon, InfoOutlineIcon, WarningIcon } from '@chakra-ui/icons';

const topFriends = [
  { name: 'Patrick Tep', picture: '', username: '@ptep03', link: '/' },
  { name: 'John Grayson', picture: '', username: '@jgray26', link: '/' },
  { name: 'Dashon Latta', picture: '', username: '@xxxdada89', link: '/' },
  { name: 'Vu Nguyen', picture: '', username: '@vuvuzela', link: '/' },
];

const friends = [
  { name: 'Tony Rojas', picture: '', username: '@skinflutes', link: '/' },
  { name: 'Daniel Nguyen', picture: '', username: '@dsun', link: '/' },
  { name: 'Henry Portillo', picture: '', username: '@henryp15', link: '/' },
  { name: 'Selwin Maz', picture: '', username: '@selmaz', link: '/' },
];
const Betslip = () => {
  return (
    <Layout
      title="Welcome!"
      description="aite bet!"
      canonical=""
      schemaData={null}
      isActive={true}
      isBanned={false}
    >
      <div>
        <Center py="10px">
          <Box>
            <Text>Add Recipients</Text>
          </Box>
        </Center>
        <box>
          <Input placeholder="Name, @username, phone, or email" />
        </box>
        <Box bg="gray.300" py="5px" pl="1em">
          Top People
        </Box>
        <VStack align="stretch">
          {topFriends.map((item) => {
            return (
              <Flex px="1em" alignItems="center" key={item.username}>
                <StarIcon />
                <Box ml="1em">
                  <Box>{item.name}</Box>
                  <Box fontSize="12px">{item.username}</Box>
                </Box>
                <Spacer />
                <InfoOutlineIcon />
              </Flex>
            );
          })}
        </VStack>
        <VStack align="stretch">
          <Box bg="gray.300" py="5px" pl="1em">
            Friends
          </Box>
          {friends.map((item) => {
            return (
              <Flex pr="1em" pl="1em" alignItems="center" key={item.username}>
                <StarIcon />
                <Box ml="1em">
                  <Box>{item.name}</Box>
                  <Box fontSize="12px">{item.username}</Box>
                </Box>
                <Spacer />
                <InfoOutlineIcon />
              </Flex>
            );
          })}
        </VStack>
      </div>
    </Layout>
  );
};

export default Betslip;
