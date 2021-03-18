import { Box } from '@chakra-ui/react';
import { Layout, Container } from 'components/index';

interface DocsLayoutProps {
  title: string;
  description: string;
  canonical: string;
  hasNavbar: boolean;
  hasFooter: boolean;
  hasTestimonials: boolean;
  isActive: boolean;
  isBanned: boolean;
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({
  title,
  description,
  canonical,
  hasNavbar,
  hasFooter,
  hasTestimonials,
  isActive,
  isBanned,
  ...props
}) => {
  return (
    <Layout
      title={title}
      description={description}
      canonical={canonical}
      hasNavbar={hasNavbar}
      hasFooter={hasFooter}
      isActive={isActive}
      isBanned={isBanned}
    >
      <Container fluid>
        <Box>{props.children}</Box>
      </Container>
    </Layout>
  );
};
