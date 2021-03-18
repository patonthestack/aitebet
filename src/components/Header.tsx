import React from 'react';
import NextLink from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Box,
  Button,
} from '@chakra-ui/react';
import Router from 'next/router';

interface JobProps {
  name: string;
}

interface HeaderProps {
  isJobOwner: boolean;
  job: JobProps;
  jobId: string;
  route: string;
}

const Header: React.FC<HeaderProps> = ({ isJobOwner, job, jobId, route }) => {
  const jobName = job.name;

  return (
    <Box mx={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <NextLink href="/jobs" passHref>
            <BreadcrumbLink>Jobs</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <NextLink href={`/job/${jobId}`} passHref>
            <BreadcrumbLink>{jobName || '-'}</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        {jobName && route && (
          <BreadcrumbItem>
            <NextLink href={`/job/${jobId}/${route}`} passHref>
              <BreadcrumbLink>{route}</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>{jobName || '-'}</Heading>
        {isJobOwner && (
          <Button
            onClick={() => Router.push(`/dashboard/job/edit/${jobId}`)}
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)',
            }}
          >
            Edit Job
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
