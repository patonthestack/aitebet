import { Meta } from 'components/index';
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { BottomNavigation } from './Navigation/BottomNavigation';
import { TopNavigation } from './Navigation/TopNavigation';
import { useAuthUser } from '@/lib/useAuthUser';

interface LayoutProps {
  title: string;
  description: string;
  canonical: string;
  schemaData?: string;
  hasNavbar?: boolean;
  hasFooter?: boolean;
  isBanned?: boolean;
  isActive?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
  canonical,
  schemaData = null,
  hasNavbar = true,
  hasFooter = true,
  isBanned = false,
  isActive = true,
}) => {
  const Loading = dynamic<any>(
    () => import('./Loading').then((mod) => mod.Loading),
    { ssr: false },
  );

  const { userData } = useAuthUser();

  return (
    <>
      {userData && (
        <>
          <Loading
            startPosition={0.3}
            stopDelayMs={200}
            height={2}
            options={{ easing: 'ease', speed: 500 }}
          />
          <Meta
            title={title}
            description={description}
            canonical={canonical}
            schemaData={schemaData}
          />
          <Box bg="gray.100">
            <TopNavigation />
          </Box>
          <Box
            as="main"
            width="100vw"
            minHeight="100vh"
            bg="gray.100"
            mb="90px"
            pt="60px"
          >
            {children}
          </Box>
          {hasFooter && (
            <Box as="footer" bg="gray.100">
              <BottomNavigation />
            </Box>
          )}
        </>
      )}
    </>
  );
};
