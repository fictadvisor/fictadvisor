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
  icon?: ReactNode;
}

const AlertButton: React.FC<AlertButtonProps> = ({
  text,
  variant = AlertButtonVariant.SUCCESS,
  icon,
  ...rest
}) => {
  let className: string;
  text
    ? icon
      ? (className = styles[variant])
      : (className = styles[variant + '-only-text'])
    : (className = styles[variant + '-without-text']);
  return (
    <button className={className} {...rest}>
      {text}
      {icon}
    </button>
  );
};

export default AlertButton;
