import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import mergeClassNames from 'merge-class-names';

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

interface AlertProps {
  title: string;
  description?: string;
  color?: AlertColor;
  variant?: AlertVariant;
}

const AlertColorMap = {
  [AlertColor.INFO]: <InformationCircleIcon />,
  [AlertColor.ERROR]: <ExclamationTriangleIcon />,
  [AlertColor.WARNING]: <ExclamationCircleIcon />,
  [AlertColor.SUCCESS]: <CheckCircleIcon />,
};

const Alert: React.FC<AlertProps> = ({
  title,
  description,
  color = AlertColor.INFO,
  variant = AlertVariant.FILLED,
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
  const icon = AlertColorMap[color];
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div
      className={mergeClassNames(styles['alert'], className, classSizeName)}
      style={{ display: isVisible ? 'flex' : 'none' }}
    >
      <div className={'icon ' + styles['alert-icon']}>{icon}</div>

      <div className={styles['alert-title']}>
        {title}
        {description && (
          <div className={styles['alert-description']}>{description}</div>
        )}
      </div>

      <div
        className={'icon ' + styles['alert-icon-x']}
        onClick={() => setIsVisible(false)}
      >
        <XMarkIcon />
      </div>
    </div>
  );
};

export default Alert;
