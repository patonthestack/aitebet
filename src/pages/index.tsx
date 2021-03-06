import { Box, Heading, Text, Link } from '@chakra-ui/react';
import { Container, Layout } from 'components/index';
import NextLink from 'next/link';

const Home: React.FC = () => {
  return (
    <Layout
      title="Welcome!"
      description="aite bet!"
      canonical=""
      hasNavbar
      hasFooter
      schemaData={null}
      isActive={true}
      isBanned={false}
    >
      <Container fluid>
        <Heading
          mt={20}
          fontWeight="700"
          fontSize="2em"
          as="h3"
          textAlign={['center', 'center', 'center', 'center']}
        >
          WELCOME!
        </Heading>
        <Text textAlign={['center', 'center', 'center', 'center']}>
          The world's first peer to peer bookie platform
        </Text>
      </Container>
    </Layout>
  );
};

export default Home;
