import React, { ReactNode } from 'react';
import cn from 'classnames';

import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';

import styles from './Button.module.scss';

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
