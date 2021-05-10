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
      <Container fluid>
        <Center>
          <Box>
            <Text>Add Recipients</Text>
          </Box>
        </Center>
        <box>
          <Input placeholder="Name, @username, phone, or email" />
        </box>
        <Text textAlign={['center', 'center', 'center', 'center']}>
          This is the create a betslip page.
        </Text>
        <Box bg="gray.300" py="5px">
          Top People
        </Box>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Flex h="40px" bg="yellow.200">
            <Box>PIC</Box>
            <Spacer />
            <Box>
              <Box>Name</Box>
              <Box>@Handle</Box>
            </Box>
            <Spacer />
            <Box>i</Box>
          </Flex>
          <Flex h="40px" bg="yellow.200">
            <Box>PIC</Box>
            <Spacer />
            <Box>
              <Box>Name</Box>
              <Box>@Handle</Box>
            </Box>
            <Spacer />
            <Box>i</Box>
          </Flex>
          <Flex h="40px" bg="yellow.200">
            <Box>PIC</Box>
            <Spacer />
            <Box>
              <Box>Name</Box>
              <Box>@Handle</Box>
            </Box>
            <Spacer />
            <Box>i</Box>
          </Flex>
          <Box bg="gray.300" py="5px">
            Friends
          </Box>{' '}
          <Flex h="40px" bg="yellow.200">
            <Box>PIC</Box>
            <Spacer />
            <Box>
              <Box>Name</Box>
              <Box>@Handle</Box>
            </Box>
            <Spacer />
            <Box>i</Box>
          </Flex>
          <Flex h="40px" bg="yellow.200">
            <Box>PIC</Box>
            <Spacer />
            <Box>
              <Box>Name</Box>
              <Box>@Handle</Box>
            </Box>
            <Spacer />
            <Box>i</Box>
          </Flex>
          <Flex h="40px" bg="yellow.200">
            <Box>PIC</Box>
            <Spacer />
            <Box>
              <Box>Name</Box>
              <Box>@Handle</Box>
            </Box>
            <Spacer />
            <Box>i</Box>
          </Flex>
        </VStack>
      </Container>
    </Layout>
  );
};

export default Betslip;
