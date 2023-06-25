import React, { FC, MouseEventHandler, ReactNode } from 'react';
import { Box, Button as ButtonMui } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import * as styles from '@/components/common/ui/button-mui/Button.styles';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

interface ButtonProps {
  text?: string;
  color?: 'primary' | 'secondary';
  variant?: 'filled' | 'outline' | 'text';
  size?: 'large' | 'medium' | 'small';
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
  color = 'primary',
  variant = 'filled',
  size = 'medium',
  startIcon,
  endIcon,
  sx,
  ...rest
}) => {
  return (
    <ButtonMui
      sx={mergeSx(styles.button(color, variant, size), sx)}
      disableRipple
      {...rest}
    >
      {startIcon && <Box sx={styles.icon}>{startIcon}</Box>}
      <p> {text} </p>
      {endIcon && <Box sx={styles.icon}>{endIcon}</Box>}
    </ButtonMui>
  );
};

export default Button;
