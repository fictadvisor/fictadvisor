import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';

import * as stylesMUI from '@/components/pages/search-pages/poll-teachers-page/components/PollTeacherSearchList.styles';
import theme from '@/styles/theme';

export const SuccessScreen = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <Box sx={stylesMUI.wrapper}>
      <Box sx={stylesMUI.content}>
        <Image
          src="/gifs/frog-complete.gif"
          alt="Frogs complete the poll"
          width={isMobile ? 300 : 480}
          height={isMobile ? 125 : 200}
          quality={100}
        />
        <Typography sx={stylesMUI.headText}>На цьому поки все</Typography>
        <Typography variant="body2">
          Дякуємо за заповнення форми, твої дані вже в обробці!
        </Typography>
      </Box>
    </Box>
  );
};
