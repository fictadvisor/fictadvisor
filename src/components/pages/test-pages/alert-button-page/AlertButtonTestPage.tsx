import React from 'react';
import { Box } from '@mui/material';

import { CustomCheck } from '@/components/common/custom-svg/CustomCheck';
import AlertButton from '@/components/common/ui/alert-button-mui';

import * as styles from './AlertButtonTestPage.styles';

const AlertButtonTestPage = () => {
  return (
    <Box sx={styles.wrapper}>
      <AlertButton startIcon={<CustomCheck />} text="hello" variant="success" />
      <AlertButton
        startIcon={<CustomCheck />}
        text="Remove"
        variant="error_fill"
      />
      <AlertButton
        startIcon={<CustomCheck />}
        text="hFIFDello"
        variant="error_outline"
        href="https://www.youtube.com/watch?v=t_Dt0E-KQH0"
      />
      <AlertButton
        startIcon={<CustomCheck />}
        text="hello"
        variant="success"
        disabled
      />
      <AlertButton
        startIcon={<CustomCheck />}
        text="Remove"
        variant="error_fill"
        disabled
      />
      <AlertButton
        startIcon={<CustomCheck />}
        text="hFIFDello"
        variant="error_outline"
        disabled
      />
      <AlertButton text="hello" variant="success" />
      <AlertButton text="Remove" variant="error_fill" />
      <AlertButton text="hFIFDello" variant="error_outline" />
      <AlertButton text="hello" variant="success" disabled />
      <AlertButton text="Remove" variant="error_fill" disabled />
      <AlertButton text="hFIFDello" variant="error_outline" disabled />
      <AlertButton text="hello" variant="success" endIcon={<CustomCheck />} />
      <AlertButton
        text="Remove"
        variant="error_fill"
        endIcon={<CustomCheck />}
      />
      <AlertButton
        text="hFIFDello"
        variant="error_outline"
        endIcon={<CustomCheck />}
      />
      <AlertButton
        text="hello"
        variant="success"
        endIcon={<CustomCheck />}
        disabled
      />
      <AlertButton
        text="Remove"
        variant="error_fill"
        endIcon={<CustomCheck />}
        disabled
      />
      <AlertButton
        text="hFIFDello"
        variant="error_outline"
        endIcon={<CustomCheck />}
        disabled
      />
      <AlertButton variant="success" endIcon={<CustomCheck />} />
      <AlertButton variant="error_fill" endIcon={<CustomCheck />} />
      <AlertButton variant="error_outline" endIcon={<CustomCheck />} />
      <AlertButton variant="success" endIcon={<CustomCheck />} disabled />
      <AlertButton variant="error_fill" endIcon={<CustomCheck />} disabled />
      <AlertButton variant="error_outline" endIcon={<CustomCheck />} disabled />
    </Box>
  );
};

export default AlertButtonTestPage;
