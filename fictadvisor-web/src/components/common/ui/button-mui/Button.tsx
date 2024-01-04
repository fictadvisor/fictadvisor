import React, { FC, MouseEventHandler, ReactNode } from 'react';
import { Box, Button as MuiButton } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Button.styles';
import { ButtonColor, ButtonSize, ButtonVariant } from './types';

interface ButtonProps {
  text?: string;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
  type?: 'button' | 'reset' | 'submit';
}

const Button: FC<ButtonProps> = ({
  text,
  color = ButtonColor.PRIMARY,
  variant = ButtonVariant.FILLED,
  size = ButtonSize.MEDIUM,
  startIcon,
  endIcon,
  sx = {},
  ...rest
}) => {
  return (
    <MuiButton
      sx={mergeSx(styles.button(color, variant, size), sx)}
      disableRipple
      {...rest}
    >
      {startIcon && <Box sx={styles.icon}>{startIcon}</Box>}
      <p> {text} </p>
      {endIcon && <Box sx={styles.icon}>{endIcon}</Box>}
    </MuiButton>
  );
};

export default Button;
