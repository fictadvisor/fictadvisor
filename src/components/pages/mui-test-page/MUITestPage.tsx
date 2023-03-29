import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import * as styles from './MUITestPage.styles';

const MuiTestPage = () => {
  return (
    <Box color="green.200" sx={styles.wrapper}>
      lol
      <Typography color="red.200" variant="h2Bold">
        yo
      </Typography>
      <Button sx={{ color: 'red.200' }}>yo</Button>
    </Box>
  );
};

export default MuiTestPage;
