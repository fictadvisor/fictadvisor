import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';

import styles from './Alert.module.scss';

export enum AlertColor {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
}

export enum AlertVariant {
  FILLED = 'filled',
  DARKER = 'darker',
  OUTLINE = 'outline',
  BORDER_LEFT = 'border-left',
  BORDER_TOP = 'border-top',
}

export interface AlertProps {
  title: string;
  description?: string;
  color?: AlertColor;
  variant?: AlertVariant;
  isClosable?: boolean;
  className?: string;
  closeFunction?: () => void;
}

const AlertIconMap = {
  [AlertColor.INFO]: InformationCircleIcon,
  [AlertColor.ERROR]: ExclamationTriangleIcon,
  [AlertColor.WARNING]: ExclamationCircleIcon,
  [AlertColor.SUCCESS]: CheckCircleIcon,
};

const Alert: React.FC<AlertProps> = ({
  title,
  description,
  color = AlertColor.INFO,
  variant = AlertVariant.FILLED,
  isClosable = true,
  closeFunction,
  className: additionalClassName,
}) => {
  let className: string;
  let classSizeName: string;
  if (
    variant === AlertVariant.BORDER_LEFT ||
    variant === AlertVariant.BORDER_TOP
  ) {
    className = styles[`alert-${color}-darker`] + ' ' + styles[variant];
    {
      description
        ? (classSizeName = styles[`alert-large`])
        : (classSizeName = styles[`alert-medium`]);
    }
  } else {
    className = styles[`alert-${color}-${variant}`];
    {
      description
        ? (classSizeName = styles[`alert-large`])
        : (classSizeName = styles[`alert-small`]);
    }
  }
  const Icon = AlertIconMap[color];
  return (
    <div
      className={cn(
        styles['alert'],
        className,
        classSizeName,
        additionalClassName,
      )}
      style={{ display: 'flex' }}
    >
      {<Icon className={'icon ' + styles['alert-icon']} />}

      <div className={styles['alert-text']}>
        <div className={styles['alert-title']}> {title} </div>
        {description && (
          <div className={styles['alert-description']}>{description}</div>
        )}
      </div>

      {isClosable && (
        <div
          className={'icon ' + styles['alert-icon-x']}
          onClick={closeFunction}
        >
          <XMarkIcon />
        </div>
      )}
    </div>
  );
};

export default Alert;
