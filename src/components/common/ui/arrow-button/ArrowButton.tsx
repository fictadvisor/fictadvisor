import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import mergeClassNames from 'merge-class-names';

import styles from './ArrowButton.module.scss';

export enum ArrowButtonSize {
  SMALL = 'small-arrow',
  MEDIUM = 'medium-arrow',
}

interface ArrowButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  size?: ArrowButtonSize;
  className?: string;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  size = ArrowButtonSize.MEDIUM,
  className,
  ...rest
}) => {
  return (
    <div>
      <button className={mergeClassNames(styles[size], className)} {...rest}>
        <ChevronLeftIcon />
      </button>
    </div>
  );
};

export default ArrowButton;
