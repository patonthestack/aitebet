import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  Text,
  Button,
} from '@chakra-ui/react';
// import AppLink from 'next/link';
import { AppLink } from 'components/AppLink';
import { useRouter } from 'next/router';
import { userProviderCheck } from 'helpers/index';
import NextLink from 'next/link';
export interface DashboardNavProps {
  bets?: Bets[];
  organizationId?: string;
  exhibitorId?: string;
}

export interface Bets {
  id: string;
  betStartDate: BetDates;
  modifiedAt: string;
  betDescription: string;
  betName: string;
  betEndDate: BetDates;
  userId: string;
}

export interface BetDates {
  _seconds: number;
  _nanoseconds: number;
}

export const DashboardNav: React.FC<DashboardNavProps> = () => {
  const router = useRouter();

  return (
    <Accordion defaultIndex={[0]}>
      <AccordionItem border={0}>
        <AccordionButton _expanded={{ bg: 'blue.500', color: 'white' }}>
          <Box flex="1" textAlign="left">
            My Profile
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <List spacing={3}>
            <ListItem>
              <AppLink href="/dashboard" className="">
                <a style={{ textDecoration: 'underlined' }}>Dashboard Home</a>
              </AppLink>
            </ListItem>
            <ListItem>
              <AppLink href="/dashboard/edit-user" className="">
                <a style={{ textDecoration: 'underlined' }}>Edit My Profile</a>
              </AppLink>
            </ListItem>
            <ListItem>
              <AppLink href="/dashboard/my-education" className="">
                <a style={{ textDecoration: 'underlined' }}>My Education</a>
              </AppLink>
            </ListItem>
            <ListItem>
              <AppLink href="/dashboard/my-documents" className="">
                <a style={{ textDecoration: 'underlined' }}>My Documents</a>
              </AppLink>
            </ListItem>
            <ListItem>
              <AppLink href="/dashboard/my-work-experience" className="">
                <a style={{ textDecoration: 'underlined' }}>
                  My Work Experience
                </a>
              </AppLink>
            </ListItem>

            {/* <ListItem>
                <AppLink href="/dashboard/my-events" className="">
                  <a style={{ textDecoration: 'underlined' }}>My Events</a>
                </AppLink>
              </ListItem> */}
          </List>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border={0}>
        <AccordionButton _expanded={{ bg: 'blue.500', color: 'white' }}>
          <Box flex="1" textAlign="left">
            {/* Virtual Events ({events?.length}) */}
            Bets
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <List spacing={3}>
            <ListItem>
              <AppLink href="/dashboard/virtual-events" className="">
                <a style={{ textDecoration: 'underlined' }}>Bets</a>
              </AppLink>
            </ListItem>

            <ListItem>
              <AppLink
                href="/dashboard/virtual-events/event/7PTERItFA2FkYVL8oD2j/jobs"
                className=""
              >
                <a style={{ textDecoration: 'underlined' }}>Jobs</a>
              </AppLink>
            </ListItem>

            {/* {events?.length > 0 ? (
              events?.map((event) => {
                return (
                  <ListItem key={event.id}>
                    <NextLink
                      href={`/dashboard/virtual-events/welcome/${event.id}`}
                    >
                      <Box
                        bg="green.200"
                        borderRadius={4}
                        p={4}
                        cursor="pointer"
                      >
                        <Text pt={2} fontWeight="bold" fontSize={'lg'}>
                          <NextLink
                            href={`/dashboard/virtual-events/welcome/${event.id}`}
                          >
                            {event.eventName}
                          </NextLink>
                        </Text>

                        <Text>
                          {' '}
                          -{' '}
                          <AppLink
                            href={`/dashboard/virtual-events/event/${event.id}/main-hall`}
                            className=""
                          >
                            <a style={{ textDecoration: 'underline' }}>
                              Main Hall
                            </a>
                          </AppLink>
                        </Text>
                        <Text>
                          {' '}
                          -{' '}
                          <AppLink
                            href={`/dashboard/virtual-events/event/${event.id}/jobs`}
                            className=""
                          >
                            <a style={{ textDecoration: 'underline' }}>Jobs</a>
                          </AppLink>
                        </Text>
                        <Text>
                          {' '}
                          -{' '}
                          <AppLink
                            href={`/dashboard/virtual-events/event/${event.id}/auditorium`}
                            className=""
                          >
                            <a style={{ textDecoration: 'underline' }}>
                              Auditorium
                            </a>
                          </AppLink>
                        </Text>
                      </Box>
                    </NextLink>
                  </ListItem>
                );
              })
            ) : (
              <Text>No upcoming events found</Text>
            )} */}
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
