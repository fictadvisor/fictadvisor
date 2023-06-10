import React from 'react';
import { Box } from '@mui/material';

import RadarChart from '@/components/common/ui/radar';
import data from '@/components/pages/test-pages/radar-test-page/testData';

import * as styles from './RadarTestPage.styles';

const RadarTestPage = () => {
  return (
    <Box sx={styles.wrapper}>
      <RadarChart info={data} />
    </Box>
  );
};
export default RadarTestPage;
