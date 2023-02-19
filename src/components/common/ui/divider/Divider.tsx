import React from 'react';

import styles from './Divider.module.scss';
export interface DividerProps {
  text: string;
  className?: string;
  textPosition: DividerTextPosition;
}

export enum DividerTextPosition {
  CENTER,
  LEFT,
  RIGHT,
}

export function Divider(props: DividerProps) {
  return (
    <div className={styles['dividers-list']}>
      {props.textPosition == DividerTextPosition.LEFT && (
        <hr className={styles['long-line']} />
      )}

      {props.textPosition == DividerTextPosition.LEFT && (
        <p className={`${styles['divider-text']} ${styles['text-right']}`}>
          {props.text}
        </p>
      )}

      {props.textPosition == DividerTextPosition.CENTER && (
        <hr className={styles['short-line']} />
      )}

      {props.textPosition == DividerTextPosition.CENTER && (
        <p className={styles['divider-text']}>{props.text}</p>
      )}

      {props.textPosition == DividerTextPosition.CENTER && (
        <hr className={styles['short-line']} />
      )}

      {props.textPosition == DividerTextPosition.RIGHT && (
        <p className={`${styles['divider-text']} ${styles['text-left']}`}>
          {props.text}
        </p>
      )}

      {props.textPosition == DividerTextPosition.RIGHT && (
        <hr className={styles['long-line']} />
      )}
    </div>
  );
}

export default Divider;
