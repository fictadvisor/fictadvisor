import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

import styles from './ArrowButton.module.scss';

export enum ArrowButtonSize {
  SMALL = 'small-arrow',
  MEDIUM = 'medium-arrow',
}

interface ArrowButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  size?: ArrowButtonSize;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  size = ArrowButtonSize.MEDIUM,
  ...rest
}) => {
  return (
    <div>
      <button className={styles[size]} {...rest}>
        <ChevronLeftIcon />
      </button>
    </div>
  );
};

export default ArrowButton;
