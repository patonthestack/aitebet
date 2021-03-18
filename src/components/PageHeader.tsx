import { Stack, Flex, Button, Heading, Text } from '@chakra-ui/react';

interface PageHeaderProps {
  title: string;
  description?: string;
  buttonTitle?: string;
  onClick?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  buttonTitle,
  onClick,
  ...props
}) => {
  return (
    <Flex
      align="center"
      justifyContent="space-between"
      my={5}
      {...props}
      as="summary"
    >
      <Stack spacing={4}>
        <Heading as="h2">{title}</Heading>
        {description && <Text>{description}</Text>}
      </Stack>
      {buttonTitle && onClick && (
        <Stack>
          <Button
            onClick={onClick}
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)',
            }}
          >
            {buttonTitle}
          </Button>
        </Stack>
      )}
    </Flex>
  );
};
