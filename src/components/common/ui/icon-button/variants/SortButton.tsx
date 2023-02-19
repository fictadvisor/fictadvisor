import React from 'react';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';

import {
  IconButton,
  IconButtonColor,
  IconButtonProps,
  IconButtonShape,
  IconButtonSize,
  SortButtonOrder,
} from '../IconButton';

const SortButton: React.FC<
  IconButtonProps & {
    order?: SortButtonOrder.ASCENDING | SortButtonOrder.DESCENDING;
  }
> = ({
  size = IconButtonSize.NORMAL,
  shape = IconButtonShape.SQUARE,
  order = SortButtonOrder.ASCENDING,
  color = IconButtonColor.ERROR,
  ...rest
}) => {
  const SortIcon = () => (
    <>
      {order === SortButtonOrder.ASCENDING ? (
        <BarsArrowUpIcon className="icon" />
      ) : (
        <BarsArrowDownIcon className="icon" />
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
