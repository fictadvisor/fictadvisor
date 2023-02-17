import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { IconButtonProps } from '../IconButton';

import styles from '../IconButton.module.scss';

const CloseButton: React.FC<IconButtonProps> = ({
  size,
  shape,
  color,
  ...rest
}) => {
  return (
    <button
      className={styles[`${shape}-button-icon-${size}-${color}`]}
      {...rest}
    >
      <XMarkIcon className="icon" />
    </button>
  );
};

export default CloseButton;
