import React from 'react';

import Alert, { AlertColor, AlertVariant } from '../alert/Alert';

import styles from './AlertPopup.module.scss';

export interface AlertPopupProps {
  title: string;
  description?: string;
  color?: AlertColor;
  variant?: AlertVariant;
  closeFunction: () => void;
}

const AlertPopup: React.FC<AlertPopupProps> = ({
  title,
  description,
  color,
  variant,
  closeFunction,
}) => {
  return (
    <div className={styles.wrapper}>
      <Alert
        isClosable={true}
        title={title}
        description={description}
        variant={variant}
        color={color}
        closeFunction={closeFunction}
      />
    </div>
  );
};

export default AlertPopup;
