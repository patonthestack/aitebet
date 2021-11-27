import React, { FC } from 'react';
import NextLink from 'next/link';
import { Box, Heading, Divider, Text } from '@chakra-ui/react';
import { _leaguesData } from '@/data/_leaguesData';
import { PoolDataProps, UserDataProps } from 'types/index';
import { Table, Td, Th, Tr } from './Table';
import SkeletonDocumentsTable from './SkeletonDocumentsTable';
import { isPoolOwner } from '../helpers';

export interface ViewPoolTableProps {
  poolDataList: PoolDataProps[];
  type?: 'owned' | 'invited' | 'historical' | 'live';
}

export const ViewPoolTable: FC<ViewPoolTableProps> = ({
  poolDataList,
  type,
}) => {
  return (
    <Box>
      <Box my={5}>
        <Heading my={3} size="md">
          {type === 'owned'
            ? 'Pools Owned'
            : type === 'invited'
            ? 'Pool Invitations'
            : type === 'historical'
            ? 'Historical Pools'
            : type === 'live'
            ? 'Live Pools'
            : ''}
        </Heading>
        <Divider borderColor="grayAlpha.300" />
      </Box>
      <Box px={{ base: 0, md: 8 }}>
        {poolDataList?.length > 0 ? (
          <Table boxShadow="none" w="full">
            <thead>
              <Tr
                display={{ base: 'none', md: 'table-row' }}
                h="7"
                borderBottomColor="gray.600"
                backgroundColor="transparent"
              >
                <Th color="gray.600" width="50px">
                  Pool Name
                </Th>
                <Th color="gray.600" width="20px">
                  League
                </Th>
                <Th color="gray.600" width="50px">
                  Created
                </Th>
              </Tr>
            </thead>
            <tbody>
              {!poolDataList ? (
                <SkeletonDocumentsTable />
              ) : (
                poolDataList?.map((pool: PoolDataProps) => {
                  return (
                    <React.Fragment key={pool.id}>
                      <Tr
                        h="auto"
                        bg="transparent"
                        borderBottomWidth={{ base: '1px', md: 0 }}
                        borderBottomColor="gray.400"
                        my={{ base: 2.5, md: 0 }}
                        boxShadow={{
                          base: '0 2px 3px rgba(0, 0, 0, .2)',
                          md: 'none',
                        }}
                        display={{ base: 'block', md: 'table-row' }}
                      >
                        <Td
                          p="2"
                          // data-label="Pool Name"
                          _before={{
                            '@media (max-width:767px)': {
                              content: 'attr(data-label)',
                              display: 'inline-block',
                              fontWeight: 'bold',
                            },
                          }}
                          display={{
                            base: 'block',
                            md: 'table-cell',
                          }}
                          borderBottom="none"
                        >
                          <NextLink
                            href={`/dashboard/manage-bets/pools/view/owned/${pool.id}`}
                          >
                            <a
                              style={{
                                textDecoration: 'underline',
                              }}
                            >
                              {pool.poolName}
                            </a>
                          </NextLink>
                        </Td>
                        <Td
                          p="2"
                          borderBottom="none"
                          // data-label="League"
                          _before={{
                            '@media (max-width:767px)': {
                              content: 'attr(data-label)',
                              display: 'inline-block',
                              fontWeight: 'bold',
                            },
                          }}
                          display={{
                            base: 'block',
                            md: 'table-cell',
                          }}
                        >
                          <Text as="span" float={{ base: 'right', md: 'none' }}>
                            {pool.leagueName}
                          </Text>
                        </Td>
                        <Td
                          p="2"
                          borderBottom="none"
                          // data-label="Period"
                          _before={{
                            '@media (max-width:767px)': {
                              content: 'attr(data-label)',
                              display: 'inline-block',
                              fontWeight: 'bold',
                            },
                          }}
                          display={{
                            base: 'block',
                            md: 'table-cell',
                          }}
                        >
                          <Text as="span" float={{ base: 'right', md: 'none' }}>
                            {new Date(pool.createdAt).toLocaleString()}
                          </Text>
                        </Td>
                      </Tr>
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </Table>
        ) : (
          <Text my={5}>No pool entries entries found</Text>
        )}
      </Box>
    </Box>
  );
};
