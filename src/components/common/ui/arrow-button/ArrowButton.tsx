import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

import styles from './ArrowButton.module.scss';

export enum ArrowButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
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
      <button className={styles[size + '-arrow']} {...rest}>
        <ChevronLeftIcon />
      </button>
    </div>
  );
};

export default ArrowButton;
