import { FC } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import {
  Box,
  Breadcrumbs as BreadcrumbsMUI,
  Link,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';
import theme from '@/styles/theme';

import * as styles from './Breadcrumbs.styles';

interface Breadcrumb {
  label: string;
  href: string;
}
interface BreadcrumbsProps {
  items: Breadcrumb[];
  sx?: SxProps<Theme>;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, sx = {} }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('mobileMedium'));

  const breadcrumbs = items.map((item, index) => (
    <Link key={index} href={item.href} underline="none">
      {index === 0 && (
        <Box sx={styles.homeIcon}>
          <HomeIcon />
        </Box>
      )}
      <Typography sx={styles.label}>{item.label}</Typography>
    </Link>
  ));

  return (
    <BreadcrumbsMUI
      sx={mergeSx(styles.breadcrumb, sx)}
      color="inherit"
      separator={
        <Box sx={styles.arrow}>
          <ChevronRightIcon />
        </Box>
      }
      aria-label="breadcrumb"
    >
      {isMobile ? (
        <Link href={items[0].href} underline="none">
          <Box sx={styles.homeIcon}>
            <ChevronLeftIcon />
          </Box>
          <Typography>{items[0].label}</Typography>
        </Link>
      ) : (
        breadcrumbs
      )}
    </BreadcrumbsMUI>
  );
};

export default Breadcrumbs;
