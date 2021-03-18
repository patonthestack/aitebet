import React from 'react';
import { Box, Skeleton } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';

const SkeletonRow = ({ width }) => (
  <Box as="tr">
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
  </Box>
);

const SkeletonDocumentsTable = () => {
  return (
    <Table width="100%">
      <thead>
        <Tr>
          <Th width="300px">Title</Th>
          <Th width="20px">Download</Th>
          <Th width="20px">View</Th>
          <Th width="20px">Edit</Th>
          <Th width="20px">Delete</Th>
        </Tr>
      </thead>
      <tbody>
        <SkeletonRow width="300px" />
        <SkeletonRow width="20px" />
        <SkeletonRow width="20px" />
        <SkeletonRow width="20px" />
        <SkeletonRow width="20px" />
      </tbody>
    </Table>
  );
};

export default SkeletonDocumentsTable;
