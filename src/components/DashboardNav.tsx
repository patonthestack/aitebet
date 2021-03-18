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
import { isOrganization, isExhibitor, isParticipant } from 'helpers/index';
import NextLink from 'next/link';
export interface DashboardNavProps {
  events?: Event[];
  userData?: any;
  organizationId?: string;
  exhibitorId?: string;
}

export interface Event {
  id: string;
  eventEndDate: EventDates;
  modifiedAt: string;
  eventDescription: string;
  eventName: string;
  eventStartDate: EventDates;
  userId: string;
}

export interface EventDates {
  _seconds: number;
  _nanoseconds: number;
}

export const DashboardNav: React.FC<DashboardNavProps> = (props) => {
  const router = useRouter();
  const { events, organizationId, exhibitorId, userData } = props;

  return (
    <Accordion defaultIndex={[0]}>
      {isParticipant(userData) && (
        <AccordionItem border={0}>
          <AccordionButton _expanded={{ bg: 'green.500', color: 'white' }}>
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
                  <a style={{ textDecoration: 'underlined' }}>
                    Edit My Profile
                  </a>
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
      )}

      {isOrganization(userData) && (
        <AccordionItem border={0}>
          <AccordionButton _expanded={{ bg: 'green.500', color: 'white' }}>
            <Box flex="1" textAlign="left">
              Home
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <List spacing={3}>
              <ListItem>
                <AppLink href="/dashboard/manage-participants" className="">
                  <a style={{ textDecoration: 'underlined' }}>Participants</a>
                </AppLink>
              </ListItem>
              <ListItem>
                <AppLink
                  href={`/dashboard/manage-exhibitors/${organizationId}`}
                  className=""
                >
                  <a style={{ textDecoration: 'underlined' }}>Exhibitors</a>
                </AppLink>
              </ListItem>
              {/* <ListItem>
                <AppLink href="/dashboard/manage-jobs" className="">
                  <a style={{ textDecoration: 'underlined' }}>Jobs</a>
                </AppLink>
              </ListItem> */}
              <ListItem>
                <AppLink href="/dashboard/my-events" className="">
                  <a style={{ textDecoration: 'underlined' }}>Virtual Events</a>
                </AppLink>
              </ListItem>

              <ListItem>
                <AppLink href="#" className="">
                  <a style={{ textDecoration: 'underlined' }}>Lists</a>
                </AppLink>
              </ListItem>

              <ListItem>
                <AppLink
                  href={`/dashboard/manage-organization-team/${organizationId}`}
                  className=""
                >
                  <a style={{ textDecoration: 'underlined' }}>Team</a>
                </AppLink>
              </ListItem>

              <ListItem>
                <AppLink href="/dashboard/manage-webinars" className="">
                  <a style={{ textDecoration: 'underlined' }}>Webinars</a>
                </AppLink>
              </ListItem>

              <ListItem>
                <AppLink href="/dashboard/edit-company" className="">
                  <a style={{ textDecoration: 'underlined' }}>
                    Organization Profile
                  </a>
                </AppLink>
              </ListItem>
            </List>
          </AccordionPanel>
        </AccordionItem>
      )}

      {isExhibitor(userData) && (
        <AccordionItem border={0}>
          <AccordionButton _expanded={{ bg: 'green.500', color: 'white' }}>
            <Box flex="1" textAlign="left">
              Home
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <List spacing={3}>
              <ListItem>
                <AppLink
                  href={`/dashboard/edit-exhibitor-company`}
                  className=""
                >
                  <a style={{ textDecoration: 'underlined' }}>
                    Company Profile
                  </a>
                </AppLink>
              </ListItem>
              <ListItem>
                <AppLink
                  href={`/dashboard/manage-exhibitor-team/${organizationId}/${exhibitorId}`}
                  className=""
                >
                  <a style={{ textDecoration: 'underlined' }}>Team</a>
                </AppLink>
              </ListItem>
              <ListItem>
                <AppLink href="/dashboard/manage-jobs" className="">
                  <a style={{ textDecoration: 'underlined' }}>Jobs</a>
                </AppLink>
              </ListItem>
            </List>
          </AccordionPanel>
        </AccordionItem>
      )}

      <AccordionItem border={0}>
        <AccordionButton _expanded={{ bg: 'green.500', color: 'white' }}>
          <Box flex="1" textAlign="left">
            Virtual Events ({events?.length})
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <List spacing={3}>
            <ListItem>
              <AppLink href="/dashboard/virtual-events" className="">
                <a style={{ textDecoration: 'underlined' }}>Virtual Events</a>
              </AppLink>
            </ListItem>

            {isOrganization(userData) ||
              (isParticipant(userData) && (
                <ListItem>
                  <AppLink
                    href="/dashboard/virtual-events/event/7PTERItFA2FkYVL8oD2j/jobs"
                    className=""
                  >
                    <a style={{ textDecoration: 'underlined' }}>Jobs</a>
                  </AppLink>
                </ListItem>
              ))}

            {events?.length > 0 ? (
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

                        {/* <Text py={2} fontWeight="bold">
                      <NextLink
                        href={`/dashboard/virtual-events/event/${event.id}`}
                      >
                        {event.eventName}
                      </NextLink>
                    </Text> */}

                        {/* <Box align="right">
                      <Button
                        onClick={() =>
                          router.push(
                            `/dashboard/virtual-events/event/${event.id}`,
                          )
                        }
                        type="button"
                        size="xs"
                        backgroundColor="green.400"
                        color="white"
                        fontWeight="medium"
                        _hover={{ bg: 'green.500', color: 'black' }}
                        _active={{
                          bg: 'green.500',
                          transform: 'scale(0.95)',
                        }}
                      >
                       ATTEND
                      </Button>
                    </Box> */}

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
            )}
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
