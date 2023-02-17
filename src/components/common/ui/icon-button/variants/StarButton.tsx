import React from 'react';
import { StarIcon } from '@heroicons/react/24/outline';

import { IconButtonProps } from '../IconButton';

import styles from '../IconButton.module.scss';

const StarButton: React.FC<IconButtonProps> = ({
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
      <StarIcon className="icon" />
    </button>
  );
};

export default StarButton;
