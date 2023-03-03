import React, { FC, ReactNode } from 'react';

import styles from './CustomDivider.module.scss';

interface CustomDividerProps {
  children?: ReactNode[] | ReactNode;
  text: string;
}

const CustomDivider: FC<CustomDividerProps> = ({ text, children }) => (
  <div className={styles['division']}>
    <h4 className={styles['division-text']}>{text}</h4>
    <div className={styles['white']}></div>
    {children}
  </div>
);

export default CustomDivider;
