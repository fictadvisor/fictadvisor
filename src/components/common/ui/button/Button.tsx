import React, { ReactNode } from 'react';
import mergeClassNames from 'merge-class-names';

import styles from './Button.module.scss';
export enum ButtonSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
}

export enum ButtonColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum ButtonVariant {
  FILLED = 'filled',
  OUTLINE = 'outline',
  TEXT = 'text',
}

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  text: string;
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  text,
  size = ButtonSize.MEDIUM,
  color = ButtonColor.PRIMARY,
  variant = ButtonVariant.FILLED,
  startIcon,
  endIcon,
  type = 'button',
  ...rest
}) => {
  const buttonStyle = `${color}-${size}${
    !startIcon ? '' : endIcon ? '-icon' : ''
  }-button`;
  const buttonVariant = `${color}-${variant}-button-variant`;
  const className = mergeClassNames(styles[buttonVariant], styles[buttonStyle]);
  return (
    <button className={className} type={type} {...rest}>
      {startIcon}
      {text}
      {endIcon}
    </button>
  );
};

export default Button;
