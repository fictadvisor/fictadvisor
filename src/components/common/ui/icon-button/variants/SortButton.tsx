import React from 'react';

import SortAscending from '@/components/common/custom-svg/SortAscending';
import SortDescending from '@/components/common/custom-svg/SortDescending';

import {
  IconButton,
  IconButtonColor,
  IconButtonProps,
  IconButtonShape,
  IconButtonSize,
} from '../IconButton';

export enum SortButtonOrder {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

const SortButton: React.FC<
  IconButtonProps & {
    order?: SortButtonOrder.ASCENDING | SortButtonOrder.DESCENDING;
  }
> = ({
  size = IconButtonSize.NORMAL,
  shape = IconButtonShape.SQUARE,
  order = SortButtonOrder.ASCENDING,
  color = IconButtonColor.SECONDARY,
  ...rest
}) => {
  const SortIcon = () => (
    <>
      {order === SortButtonOrder.ASCENDING ? (
        <SortAscending />
      ) : (
        <SortDescending />
      )}
    </>
  );
  return (
    <IconButton
      icon={<SortIcon />}
      size={size}
      shape={shape}
      color={color}
      {...rest}
    />
  );
};

export default SortButton;
