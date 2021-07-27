import React from 'react';
import { Box, Button, Heading, Stack, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface Props {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const DashboardCard: React.FC<Props> = ({title, description, buttonText, buttonLink}) => {
  const router = useRouter();

  return (
    <Stack>
      <Box backgroundColor="white" shadow="md" borderRadius="lg" py={5} mx={4}>
        <Flex
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading
            size="md"
            as="h2"
            lineHeight="shorter"
            fontWeight="bold"
            fontFamily="heading"
            pb={4}
          >
            {title}
          </Heading>
          <Text fontSize="md" px={5} textAlign="center">
            {description}
          </Text>
        </Flex>
        <Stack ml={4} shouldWrapChildren mt={4} mr={4}>
          <Stack
            shouldWrapChildren
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Button
              colorScheme="blue"
              variant="outline"
              onClick={() =>
                router
                  .push(`${buttonLink}`)
                  .then(() => window.scrollTo(0, 0))
              }
            >
              {buttonText}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default DashboardCard;
