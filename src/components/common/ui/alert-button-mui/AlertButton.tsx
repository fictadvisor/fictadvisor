import React, { FC } from 'react';
import { Box, Button } from '@mui/material';

import * as styles from '@/components/common/ui/alert-button-mui/AlertButton.styles';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import { AlertButtonProps, AlertButtonVariant } from './types';

const AlertButton: FC<AlertButtonProps> = ({
  text,
  variant = AlertButtonVariant.SUCCESS,
  startIcon,
  endIcon,
  sx = {},
  ...rest
}) => {
  return (
    <Button
      sx={mergeSx(styles.button(variant, startIcon, endIcon, text), sx)}
      disableRipple
      {...rest}
    >
      {startIcon && <Box sx={styles.icon}>{startIcon}</Box>}
      <p> {text} </p>
      {endIcon && <Box sx={styles.icon}>{endIcon}</Box>}
    </Button>
  );
};

export default AlertButton;
