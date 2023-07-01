import React, { ReactNode } from 'react';
import cn from 'classnames';

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
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  size = ButtonSize.MEDIUM,
  color = ButtonColor.PRIMARY,
  variant = ButtonVariant.FILLED,
  startIcon,
  endIcon,
  type,
  className: additionalClassName,
  ...rest
}) => {
  const buttonStyle = `${color}-${size}${
    !startIcon ? '' : endIcon ? '-icon' : ''
  }-button`;
  const buttonVariant = `${color}-${variant}-button-variant`;
  const buttonText = `${variant}-${size}-button`;
  const className = cn(
    styles[buttonVariant],
    styles[buttonStyle],
    styles[buttonText],
    additionalClassName,
  );
  return (
    <button className={className} type={type} {...rest}>
      {startIcon}
      {text}
      {endIcon}
    </button>
  );
};

export default Button;
