import { Box } from '@mui/material';

import Breadcrumbs from '@/components/common/ui/breadcrumbs-mui';

import * as styles from './MUIBreadcrumbPage.styles';

const items = [
  { label: 'test1', href: '#' },
  { label: 'test2', href: '#' },
  { label: 'test3', href: '#' },
  { label: 'long test4', href: '#' },
];

const MUIBreadcrumbPage = () => {
  return (
    <Box sx={styles.container}>
      <Breadcrumbs items={items} />
    </Box>
  );
};

export default MUIBreadcrumbPage;
