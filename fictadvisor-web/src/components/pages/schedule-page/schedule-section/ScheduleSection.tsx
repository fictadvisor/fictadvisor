import { Box } from '@mui/material';

import Schedule from './components/schedule';
import ScheduleHeader from './components/schedule-header';
import * as styles from './ScheduleSection.styles';

export const ScheduleSection = ({}) => {
  return (
    <Box sx={styles.scheduleSection}>
      <ScheduleHeader />
      <Schedule />
    </Box>
  );
};
