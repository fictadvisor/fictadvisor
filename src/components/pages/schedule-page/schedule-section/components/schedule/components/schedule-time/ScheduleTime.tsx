import { Box, Typography } from '@mui/material';

import * as styles from './ScheduleTime.styles';

const ScheduleTime = () => {
  const time = [
    '08',
    '09',
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
  ];

  return (
    <Box sx={styles.time}>
      {time.map(hour => (
        <Typography sx={styles.text} key={hour}>
          {hour}:00
        </Typography>
      ))}
    </Box>
  );
};

export default ScheduleTime;
