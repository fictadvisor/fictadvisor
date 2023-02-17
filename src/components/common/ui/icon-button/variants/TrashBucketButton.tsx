import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

import { IconButtonProps } from '../IconButton';

import styles from '../IconButton.module.scss';

const TrashBucketButton: React.FC<IconButtonProps> = ({
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
      <TrashIcon className="icon" />
    </button>
  );
};

export default TrashBucketButton;
