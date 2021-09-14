import React, { FC, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useToast, Box, Heading, Divider, Text } from '@chakra-ui/react';

import { _leaguesData } from '@/data/_leaguesData';
import { LabelValue, PoolDataProps } from 'types/index';
import { useSportsDB, useUsers } from '@/hooks/index';
import { Table, Td, Th, Tr } from './Table';
import SkeletonDocumentsTable from './SkeletonDocumentsTable';

export interface ViewPoolSheetProps {
  poolData: PoolDataProps;
}

export const ViewPoolSheet: FC<ViewPoolSheetProps> = ({ poolData }) => {
  return (
    <Box>
      <Box my={5}>
        <Heading my={3} size="md">
          (Pool Name) LIVE SHEET
        </Heading>
        <Divider borderColor="grayAlpha.300" />
      </Box>
      <Box px={{ base: 0, md: 8 }}>
        {poolData.matchups?.length > 0 ? (
          <Table boxShadow="none" w="full">
            <thead>
              <Tr
                display={{ base: 'none', md: 'table-row' }}
                h="7"
                borderBottomColor="gray.600"
                backgroundColor="transparent"
              >
                <Th color="gray.600" width="50px">
                  Matchup Name
                </Th>
                <Th color="gray.600" width="20px">
                  TODO Map through users' names here
                </Th>
              </Tr>
            </thead>
            <tbody>
              {!poolData ? (
                <SkeletonDocumentsTable />
              ) : (
                poolData.matchups?.map((matchup: LabelValue) => {
                  return (
                    <React.Fragment key={matchup.value}>
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
                          borderBottom="none"
                          data-label="League"
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
                            {matchup.label.substring(
                              0,
                              matchup.label.indexOf('@'),
                            )}
                          </Text>
                        </Td>
                        <Td
                          p="2"
                          borderBottom="none"
                          data-label="League"
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
                            TODO Map through Users' Picks Here
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
