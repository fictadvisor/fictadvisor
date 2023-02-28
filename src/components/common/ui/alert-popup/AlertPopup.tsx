//margin right 80px margin bottom 36px
import React, { ReactNode } from 'react';

import styles from './AlertPopup.module.scss';

interface AlertPopupProps {
  children: ReactNode;
}

const AlertPopup: React.FC<AlertPopupProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default AlertPopup;
