import React, { ReactNode } from 'react';
import mergeClassNames from 'merge-class-names';

import styles from './AlertButton.module.scss';
export enum AlertButtonType {
  SUCCESS = 'success',
  ERROR_PRIMARY = 'error-primary',
  ERROR_SECONDARY = 'error-secondary',
}

export enum AlertButtonIconPosition {
  LEFT,
  RIGHT,
}

interface AlertButtonProps {
  text?: string;
  onClick?: any;
  isDisabled: boolean;
  type: AlertButtonType;
  icon?: ReactNode;
  iconPosition?: AlertButtonIconPosition;
  className?: string;
}

const AlertButton: React.FC<AlertButtonProps> = props => {
  const buttonColor = `${props.type}-alert-button-color`;
  const buttonStyle = props.text
    ? `alert${props.icon ? '-icon' : ''}-button`
    : 'unlabeled-alert-button';
  const additionalClass = props.className ? props.className : '';
  const className = mergeClassNames(
    styles[buttonColor],
    styles[buttonStyle],
    styles[additionalClass],
  );

  return (
    <button
      disabled={props.isDisabled}
      className={className}
      onClick={() => {
        props?.onClick;
      }}
    >
      {props.icon && props.iconPosition == AlertButtonIconPosition.LEFT && (
        <div className="icon"> {props.icon} </div>
      )}
      {props.text}
      {props.icon && props.iconPosition == AlertButtonIconPosition.RIGHT && (
        <div className="icon"> {props.icon} </div>
      )}
    </button>
  );
};

export default AlertButton;
