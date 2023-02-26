import React, { ReactNode } from 'react';

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
}

const AlertButton: React.FC<AlertButtonProps> = ({
  text,
  variant = AlertButtonVariant.SUCCESS,
  startIcon,
  endIcon,
  ...rest
}) => {
  let className: string;
  text
    ? startIcon || endIcon
      ? (className = styles[variant])
      : (className = styles[variant + '-only-text'])
    : (className = styles[variant + '-without-text']);
  return (
    <button className={className} {...rest}>
      {startIcon}
      {text}
      {endIcon}
    </button>
  );
};

export default AlertButton;
