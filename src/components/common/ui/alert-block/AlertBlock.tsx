import React, { useState } from 'react';
import mergeClassNames from 'merge-class-names';

import { CrossIcon } from '../../custom-svg/alert-icons/CrossIcon';
import { ExclamationIcon } from '../../custom-svg/alert-icons/ExclamationIcon';
import { InfoIcon } from '../../custom-svg/alert-icons/InfoIcon';
import { SuccessIcon } from '../../custom-svg/alert-icons/SuccessIcon';
import { WarningIcon } from '../../custom-svg/alert-icons/WarningIcon';

import styles from './AlertBlock.module.scss';

export enum AlertBlockSize {
  SMALL = 'small',
  MEDIUM = 'middle',
  LARGE = 'large',
}

export enum AlertBlockColor {
  BLUE = 'blue',
  RED = 'red',
  ORANGE = 'orange',
  GREEN = 'green',
}

export enum AlertBlockStyle {
  OUTLINED = 'outlined',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  BORDER_LEFT = 'border-left',
  BORDER_TOP = 'border-top',
}

interface AlertBlockProps {
  title: string;
  description?: string;
  size?: AlertBlockSize;
  color?: AlertBlockColor;
  style?: AlertBlockStyle;
}

const AlertBlock: React.FC<AlertBlockProps> = ({
  title,
  description,
  size = 'large',
  color = 'blue',
  style = 'primary',
}) => {
  let className;
  switch (style) {
    case 'outlined':
      className = styles[`alert-${color}-outlined`];
      break;
    case 'secondary':
      className = styles[`alert-${color}-secondary`];
      break;
    case 'primary':
      className = styles[`alert-${color}`];
      break;
    default:
      className = styles[`alert-${color}-secondary`] + ' ' + styles[style];
      break;
  }

  let icon = <InfoIcon />;
  if (color === 'red') {
    icon = <WarningIcon />;
  } else if (color === 'orange') {
    icon = <ExclamationIcon />;
  } else if (color === 'green') icon = <SuccessIcon />;

  const [isVisible, setIsVisible] = useState(true);
  return (
    <div
      className={mergeClassNames(
        styles['alert'],
        className,
        styles[`alert-${size}`],
      )}
      style={{ display: isVisible ? 'grid' : 'none' }}
    >
      <div className={styles['alert-icon']}>{icon}</div>

      <div className={styles['alert-title']}>{title}</div>

      <div
        className={styles['alert-icon-x']}
        onClick={() => setIsVisible(false)}
      >
        <CrossIcon />
      </div>

      {description && (
        <div className={styles['alert-description']}>{description}</div>
      )}
    </div>
  );
};

export default AlertBlock;
