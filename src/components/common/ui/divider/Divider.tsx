import React from 'react';
import cn from 'classnames';

import styles from './Divider.module.scss';

export enum DividerTextPosition {
  CENTER,
  LEFT,
  RIGHT,
}
interface DividerProps {
  text?: string;
  textPosition?: DividerTextPosition;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  text,
  textPosition = DividerTextPosition.CENTER,
  className,
}) => {
  return (
    <div className={cn(styles['dividers-list'], className)}>
      {!text && (
        <div className={styles['dividers-list-items']}>
          <hr className={styles['no-text-line']} />
        </div>
      )}

      {text && textPosition == DividerTextPosition.LEFT && (
        <div className={styles['dividers-list-items']}>
          <hr className={styles['side-line']} />
          <p className={`${styles['divider-text']} ${styles['text-right']}`}>
            {text}
          </p>
        </div>
      )}

      {text && textPosition == DividerTextPosition.CENTER && (
        <div className={styles['dividers-list-items']}>
          <hr className={styles['center-line']} />
          <p className={styles['divider-text']}>{text}</p>
          <hr className={styles['center-line']} />
        </div>
      )}

      {text && textPosition == DividerTextPosition.RIGHT && (
        <div className={styles['dividers-list-items']}>
          <p className={`${styles['divider-text']} ${styles['text-left']}`}>
            {text}
          </p>
          <hr className={styles['side-line']} />
        </div>
      )}
    </div>
  );
};

export default Divider;
