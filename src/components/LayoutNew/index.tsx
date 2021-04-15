import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  useBoolean,
  useBreakpointValue,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  HiDuplicate,
  HiMail,
  HiOutlineMenu,
  HiRefresh,
  HiTemplate,
  HiViewGrid,
  HiX,
} from 'react-icons/hi';
import { Logo } from './Logo';
import { NavItem } from './NavItem';
import { Notification } from './Notification';
import { ProfileDropdown } from './ProfileDropdown';
import { TabLink } from './TabLink';

const useMobileMenuState = () => {
  const [isMenuOpen, actions] = useBoolean();
  /**
   * Scenario: Menu is open on mobile, and user resizes to desktop/tablet viewport.
   * Result: We'll close the menu
   */
  const isMobileBreakpoint = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    if (isMobileBreakpoint == false) {
      actions.off();
    }
  }, [isMobileBreakpoint, actions]);

  return { isMenuOpen, ...actions };
};

export const LayoutNew = () => {
  const { isMenuOpen, toggle } = useMobileMenuState();
  return (
    <Flex direction="column" bg={mode('gray.100', 'gray.800')} height="100vh">
      <Flex
        align="center"
        bg="blue.600"
        color="white"
        px="6"
        h={['16', '16', '48']}
      >
        <Flex justify="space-between" align="center" w="full">
          {/* Mobile Hamburger Menu */}
          <Box
            ms="-4"
            minW={{ base: '12', lg: '76px' }}
            // display={{ lg: 'none' }}
            display={['block', 'block', 'none']}
          >
            <Box as="button" onClick={toggle} p="2" fontSize="xl">
              <Box aria-hidden as={isMenuOpen ? HiX : HiOutlineMenu} />
              <Box srOnly>{isMenuOpen ? 'Close menu' : 'Open menu'}</Box>
            </Box>
          </Box>

          {/* Mobile Navigation Menu  */}
          <Flex
            hidden={!isMenuOpen}
            as="nav"
            direction="column"
            bg="blue.600"
            position="fixed"
            height="calc(100vh - 4rem)"
            top="16"
            insetX="0"
            zIndex={10}
            w="full"
          >
            <Box px="4">
              <NavItem.Mobile active label="Dashboard" />
              <NavItem.Mobile label="Campaigns" />
              <NavItem.Mobile label="Forms" />
              <NavItem.Mobile label="Sites" />
              <NavItem.Mobile label="Automation" />
            </Box>
          </Flex>

          {/* Desktop Logo placement (left) */}
          <Logo
            // display={{ base: 'none', lg: 'block' }}
            display={['none', 'none', 'block']}
            flexShrink={0}
            h="5"
            marginEnd="10"
          />

          {/* Desktop Navigation Menu */}
          {/* <HStack spacing="3" flex="1" display={{ base: 'none', lg: 'flex' }}> */}
          <HStack spacing="3" flex="1" display={['none', 'none', 'block']}>
            <NavItem.Desktop active icon={<HiViewGrid />} label="Dashboard" />
            <NavItem.Desktop icon={<HiMail />} label="Campaigns" />
            <NavItem.Desktop icon={<HiDuplicate />} label="Forms" />
            <NavItem.Desktop icon={<HiTemplate />} label="Sites" />
            <NavItem.Desktop icon={<HiRefresh />} label="Automation" />
          </HStack>

          {/* Mobile Logo placement (right)*/}
          <Logo
            flex={{ base: '1', lg: '0' }}
            // display={{ lg: 'none' }}
            display={['block', 'block', 'none']}
            flexShrink={0}
            h="5"
          />

          <HStack spacing="3">
            {/* <Notification display={{ base: 'none', lg: 'inline-flex' }} /> */}
            <Notification display={['none', 'none', 'block']} />
            <ProfileDropdown />
          </HStack>
        </Flex>
      </Flex>

      {/* Page Header */}
      <Box bg={mode('white', 'gray.900')} pt="8" shadow="sm">
        <Container maxW="7xl">
          <Heading size="lg" mb="3">
            Forms
          </Heading>
          <Stack direction="row" spacing="4">
            <TabLink aria-current="page" href="/dashboard">
              Dashboard
            </TabLink>
            <TabLink href="#">Analytics</TabLink>
            <TabLink href="#">Automation</TabLink>
          </Stack>
        </Container>
      </Box>

      {/* Main content area */}
      <Box as="main" py="8" flex="1">
        <Container maxW="7xl">
          <Box bg={mode('white', 'gray.700')} p="6" rounded="lg" shadow="base">
            <Box
              border="3px dashed currentColor"
              color={mode('gray.200', 'gray.600')}
              h="96"
              rounded="lg"
            />
          </Box>
        </Container>
      </Box>
    </Flex>
  );
};
