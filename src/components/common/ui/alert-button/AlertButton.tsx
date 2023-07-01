import React, { ReactNode } from 'react';
import cn from 'classnames';

import styles from './AlertButton.module.scss';

export enum AlertButtonVariant {
  ERROR_FILLED = 'error-filled-alert-button',
  ERROR_OUTLINE = 'error-outline-alert-button',
  SUCCESS = 'success-alert-button',
}

interface AlertButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  text?: string;
  variant?: AlertButtonVariant;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
}

const AlertButton: React.FC<AlertButtonProps> = ({
  text,
  variant = AlertButtonVariant.SUCCESS,
  startIcon,
  endIcon,
  className: additionalClassName,
  ...rest
}) => {
  let className: string;
  text
    ? startIcon || endIcon
      ? (className = styles[variant])
      : (className = styles[variant + '-only-text'])
    : (className = styles[variant + '-without-text']);
  return (
    <button className={cn(className, additionalClassName)} {...rest}>
      {startIcon}
      {text}
      {endIcon}
    </button>
  );
};

export default AlertButton;
