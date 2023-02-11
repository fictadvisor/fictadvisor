import React from 'react';
import mergeClassNames from 'merge-class-names';

import styles from './Tooltip.module.scss';

export enum TooltipDirection {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

interface TooltipProps {
  text: string;
  direction?: TooltipDirection;
}

const Tooltip: React.FC<TooltipProps> = ({ direction, text }) => {
  if (direction) {
    return (
      <div className={styles['tooltip-body']}>
        <span
          className={mergeClassNames(
            styles['tooltip-text'],
            styles[`tooltip-text-${direction}`],
          )}
        >
          {text}
        </span>
      </div>
    );
  }

  return (
    <div className={styles['tooltip-body']}>
      <span>{text}</span>
    </div>
  );
};

export default Tooltip;
