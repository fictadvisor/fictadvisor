import React from 'react';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';

import { IconButtonProps, SortButtonOrder } from '../IconButton';

import styles from '../IconButton.module.scss';

const SortButton: React.FC<
  IconButtonProps & {
    order: SortButtonOrder.ASCENDING | SortButtonOrder.DESCENDING;
  }
> = ({ size, shape, order, color, ...rest }) => {
  return (
    <button
      className={styles[`${shape}-button-icon-${size}-${color}`]}
      {...rest}
    >
      {order === SortButtonOrder.ASCENDING ? (
        <BarsArrowUpIcon className="icon" />
      ) : (
        <BarsArrowDownIcon className="icon" />
      )}
    </button>
  );
};

export default SortButton;
