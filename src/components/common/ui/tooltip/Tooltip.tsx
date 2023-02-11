import React from 'react';
import mergeClassNames from 'merge-class-names';

import styles from './Tooltip.module.scss';

export enum TooltipDirection {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

type TooltipProps = {
  text: string;
  direction?: 'top' | 'bottom' | 'left' | 'right';
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Tooltip: React.FC<TooltipProps> = ({ direction, text, ...props }) => {
  if (direction) {
    return (
      <div className={styles['tooltip-body']} {...props}>
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
