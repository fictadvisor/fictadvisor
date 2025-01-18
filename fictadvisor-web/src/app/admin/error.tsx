'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import getErrorMessage from '@/lib/utils/getErrorMessage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h4Medium"
        style={{ color: 'grey.100', marginBottom: '32px' }}
      >
        Sorry! {getErrorMessage(error)}
      </Typography>
      <Box sx={{ maxWidth: '200px' }}>
        <Button
          text="Спробувати знову"
          size={ButtonSize.MEDIUM}
          color={ButtonColor.PRIMARY}
          variant={ButtonVariant.FILLED}
          onClick={reset}
        />
      </Box>
    </Box>
  );
}
