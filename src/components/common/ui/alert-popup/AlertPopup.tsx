//margin right 80px margin bottom 36px
import React, { useState } from 'react';

import Alert, { AlertColor, AlertVariant } from '../alert/Alert';

import styles from './AlertPopup.module.scss';

export interface AlertPopupProps {
  title: string;
  description?: string;
  color?: AlertColor;
  variant?: AlertVariant;
  isClosable?: boolean;
  className?: string;
  closeTime?: number;
}

const AlertPopup: React.FC<AlertPopupProps> = ({
  title,
  description,
  color,
  variant,
  isClosable = false,
  className,
  closeTime,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  closeTime && setTimeout(() => setIsVisible(false), closeTime * 1000);
  return (
    <div className={styles.wrapper}>
      {isVisible && (
        <Alert
          className={className}
          isClosable={isClosable}
          title={title}
          description={description}
          variant={variant}
          color={color}
        />
      )}
    </div>
  );
};

export default AlertPopup;
