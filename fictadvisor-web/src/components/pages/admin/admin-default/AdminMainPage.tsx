import React from 'react';
import { Box, Typography } from '@mui/material';

import * as styles from './AdminMainPage.styles';
const AdminMainPage = () => {
  return (
    <Box sx={styles.wrapper}>
      <div style={{ width: '369px', height: '208px' }}>
        <iframe
          allowFullScreen={false}
          frameBorder="0"
          style={{ width: '369px', height: '208px' }}
          src="https://giphy.com/embed/wpLcabJkBNcUk0fcE5/video"
        ></iframe>
      </div>
      <Typography variant="h3SemiBold" marginTop="15px" textAlign="center">
        Вітаємо в admin панелі
      </Typography>
      <Typography variant="h6" textAlign="center">
        Здається бог тебе за щось наказує
      </Typography>
    </Box>
  );
};

export default AdminMainPage;
