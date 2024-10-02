'use client';

import React, { FC, MouseEventHandler, ReactNode, useState } from 'react';
import { Box, Button as MuiButton, CircularProgress } from '@mui/material';
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
  loadingOnClick?: boolean;
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
  loadingOnClick = false,
  sx = {},
  disabled,
  onClick,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loadingOnClick) {
      setLoading(true);
      setTimeout(() => setLoading(false), 3000);
    }
    onClick?.(event);
  };

  const getCircularSize = (size: ButtonSize) => {
    switch (size) {
      case ButtonSize.LARGE:
        return 25;
      case ButtonSize.MEDIUM:
        return 26;
      case ButtonSize.SMALL:
        return 20;
      default:
        return 20;
    }
  };

  return (
    <MuiButton
      sx={mergeSx(styles.button(color, variant, size, loading), sx)}
      disableRipple
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {loading ? (
        <CircularProgress size={getCircularSize(size)} color="inherit" />
      ) : (
        <>
          {startIcon && <Box sx={styles.icon}>{startIcon}</Box>}
          <p> {text} </p>
          {endIcon && <Box sx={styles.icon}>{endIcon}</Box>}
        </>
      )}
    </MuiButton>
  );
};

export default Button;
