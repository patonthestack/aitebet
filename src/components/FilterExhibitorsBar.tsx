import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  SimpleGrid,
  Stack,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react';
import { FaChevronUp, FaChevronDown, FaList, FaTable } from '@meronex/icons/fa';
import { useRouter } from 'next/router';
import { slugify } from 'helpers/index';

// const countriesData = [
//   {
//     label: 'Afghanistan',
//     value: 'AF',
//   },
//   {
//     label: 'Åland Islands',
//     value: 'AX',
//   },
//   {
//     label: 'Albania',
//     value: 'AL',
//   },
//   {
//     label: 'Algeria',
//     value: 'DZ',
//   },
//   {
//     label: 'American Samoa',
//     value: 'AS',
//   },
//   {
//     label: 'AndorrA',
//     value: 'AD',
//   },
//   {
//     label: 'Angola',
//     value: 'AO',
//   },
//   {
//     label: 'Anguilla',
//     value: 'AI',
//   },
//   {
//     label: 'Antarctica',
//     value: 'AQ',
//   },
//   {
//     label: 'Antigua and Barbuda',
//     value: 'AG',
//   },
//   {
//     label: 'Argentina',
//     value: 'AR',
//   },
//   {
//     label: 'Armenia',
//     value: 'AM',
//   },
//   {
//     label: 'Aruba',
//     value: 'AW',
//   },
// ];

// const regionData = [
//   {
//     label: 'Somewhere',
//     value: 'Somewhere',
//   },
//   {
//     label: 'Somewhere else',
//     value: 'Somewhere else',
//   },
// ];

const workTypes = [
  {
    id: 1,
    label: 'Full-Time',
    value: 'full-time',
  },
  {
    id: 2,
    label: 'Part-Time',
    value: 'part-time',
  },
];

// const jobIndustries = [
//   {
//     label: 'Accounting',
//     value: 'Accounting',
//   },
//   {
//     label: 'Airlines/Aviation',
//     value: 'Airlines/Aviation',
//   },
//   {
//     label: 'Alternative Dispute Resolution',
//     value: 'Alternative Dispute Resolution',
//   },
//   {
//     label: 'Alternative Medicine',
//     value: 'Alternative Medicine',
//   },
//   {
//     label: 'Animation',
//     value: 'Animation',
//   },
//   {
//     label: 'Apparel/Fashion',
//     value: 'Apparel/Fashion',
//   },
// ];

const WorkTypeList = (props) => {
  const router = useRouter();
  const { baseRoute } = props;

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            ml={['0px', '0px', '0px']}
            isActive={isOpen}
            as={Button}
            rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
            bg="white"
            _hover={{ bg: 'gray.200' }}
            _active={{
              bg: 'gray.200',
              transform: 'scale(0.98)',
            }}
            _focus={{
              boxShadow:
                '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            }}
          >
            Job Type
          </MenuButton>
          <MenuList overflowY="scroll" maxHeight="400px">
            {workTypes.map((type, i) => {
              return (
                <MenuItem
                  onClick={() =>
                    router.push(`${baseRoute}?jobType=${type.label}`)
                  }
                  key={i}
                >
                  {type.label}
                </MenuItem>
              );
            })}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

const IndustryList = (props) => {
  const router = useRouter();
  const { baseRoute, jobIndustriesData } = props;

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            ml={['0px', '0px', '0px']}
            isActive={isOpen}
            as={Button}
            rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
            bg="white"
            _hover={{ bg: 'gray.200' }}
            _active={{
              bg: 'gray.200',
              transform: 'scale(0.98)',
            }}
            _focus={{
              boxShadow:
                '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            }}
          >
            Industry
          </MenuButton>

          <MenuList overflowY="scroll" maxHeight="400px">
            <MenuOptionGroup title="Industry" type="checkbox">
              {jobIndustriesData?.map((industry, i) => {
                return (
                  <MenuItemOption
                    value={industry}
                    onClick={() =>
                      router.push(`${baseRoute}?industry=${industry}`)
                    }
                    key={i}
                  >
                    {industry}
                  </MenuItemOption>
                );
              })}
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

const CountryList = (props) => {
  const router = useRouter();
  const { baseRoute, countriesData } = props;

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            ml={['0px', '10px', '15px']}
            isActive={isOpen}
            as={Button}
            rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
            bg="white"
            _hover={{ bg: 'gray.200' }}
            _active={{
              bg: 'gray.200',
              transform: 'scale(0.98)',
            }}
            _focus={{
              boxShadow:
                '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            }}
          >
            Country
          </MenuButton>

          <MenuList overflowY="scroll" maxHeight="400px">
            <MenuOptionGroup title="Country" type="checkbox">
              {countriesData?.map((country, i) => {
                return (
                  <MenuItemOption
                    value={country}
                    onClick={
                      () => alert(country)
                      // router.push(`${baseRoute}?country=${country.label}`)
                    }
                    key={i}
                  >
                    {country}
                  </MenuItemOption>
                );
              })}
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

const RegionList = (props) => {
  const router = useRouter();
  const { baseRoute, regionsData } = props;

  return (
    <Menu closeOnSelect={false}>
      {({ isOpen }) => (
        <>
          <MenuButton
            ml={['0px', '10px', '15px']}
            isActive={isOpen}
            as={Button}
            rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
            bg="white"
            _hover={{ bg: 'gray.200' }}
            _active={{
              bg: 'gray.200',
              transform: 'scale(0.98)',
            }}
            _focus={{
              boxShadow:
                '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            }}
          >
            Region
          </MenuButton>
          <MenuList overflowY="scroll" maxHeight="400px">
            <MenuOptionGroup title="Region" type="checkbox">
              {regionsData?.map((region, i) => {
                return (
                  <MenuItemOption
                    value={region}
                    // onClick={
                    //   () => alert(region.label)
                    //   // router.push(`${baseRoute}?region=${region.label}`)
                    // }
                    key={i}
                  >
                    {region}
                  </MenuItemOption>
                );
              })}
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export function FilterExhibitorsBar(props) {
  const router = useRouter();
  const {
    onViewChange,
    viewType,
    baseRoute,
    countriesData,
    regionsData,
    jobIndustriesData,
  } = props;
  return (
    <>
      <SimpleGrid
        columns={[1, 1, 4, 4]}
        spacingY={4}
        spacingX={['0px', '0px', '15px']}
      >
        {/* <Box>
          <InputGroup size="md" minW="300px">
            <Input
              variant="fill"
              pr="4.5rem"
              type="text"
              placeholder="Search Companies"
              onChange={(e) => console.log(e.target.value)}
            />
            <InputRightElement width="3.2rem">
              <IconButton
                aria-label="Search Companies"
                icon={<FaSearch />}
                h="1.75rem"
                size="md"
                onClick={() => console.log('search clicked')}
                mr={0}
              />
            </InputRightElement>
          </InputGroup>
        </Box> */}
        <Box>
          <Stack direction={['column', 'row']} spacing={0}>
            {/* <WorkTypeList baseRoute={baseRoute} /> */}
            <IndustryList
              baseRoute={baseRoute}
              jobIndustriesData={jobIndustriesData}
            />
            <CountryList baseRoute={baseRoute} countriesData={countriesData} />
            <RegionList baseRoute={baseRoute} regionsData={regionsData} />

            <Button
              ml={['0px', '0px', '0px']}
              d={['none', 'none', 'flex']}
              onClick={() => onViewChange('grid')}
              roundedRight={0}
              leftIcon={<FaTable />}
              bg={viewType === 'grid' ? 'gray.200' : 'white'}
              _hover={{ bg: 'gray.200' }}
              _active={{
                bg: 'gray.200',
                transform: 'scale(0.98)',
              }}
              _focus={{
                boxShadow:
                  '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
              }}
            >
              Grid
            </Button>
            <Button
              d={['none', 'none', 'flex']}
              onClick={() => onViewChange('list')}
              roundedLeft={0}
              leftIcon={<FaList />}
              bg={viewType === 'list' ? 'gray.200' : 'white'}
              _hover={{ bg: 'gray.200' }}
              _active={{
                bg: 'gray.200',
                transform: 'scale(0.98)',
              }}
              _focus={{
                boxShadow:
                  '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
              }}
            >
              List
            </Button>
          </Stack>
        </Box>
      </SimpleGrid>
    </>
  );
}
