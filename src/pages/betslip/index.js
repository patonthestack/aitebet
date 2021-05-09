import React from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';
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
        <Text textAlign={['center', 'center', 'center', 'center']}>
          This is the create a betslip page.
        </Text>
      </Container>
    </Layout>
  );
};

export default Betslip;
