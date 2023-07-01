import React from 'react';

import Alert from '@/components/common/ui/alert-mui';
import {
  AlertType,
  AlertVariant,
} from '@/components/common/ui/alert-mui/types';

import styles from './AlertPopup.module.scss';

export interface AlertPopupProps {
  title: string;
  description?: string;
  color?: AlertType;
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
        title={title}
        description={description}
        type={color}
        variant={variant}
        onClose={closeFunction}
      />
    </div>
  );
};

export default AlertPopup;
