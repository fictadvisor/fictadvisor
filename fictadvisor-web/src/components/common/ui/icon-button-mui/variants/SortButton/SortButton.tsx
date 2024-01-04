import React from 'react';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';

import IconButton from '@/components/common/ui/icon-button-mui/IconButton';
import {
  IconButtonColor,
  IconButtonOrder,
  IconButtonShape,
  IconButtonSize,
  OrderedIconButtonProps,
} from '@/components/common/ui/icon-button-mui/types';

const SortButton: React.FC<OrderedIconButtonProps> = ({
  size = IconButtonSize.NORMAL,
  shape = IconButtonShape.SQUARE,
  order = IconButtonOrder.ASCENDING,
  color = IconButtonColor.SECONDARY,
  disabled,
  ...rest
}) => {
  const SortIcon =
    order === IconButtonOrder.ASCENDING ? BarsArrowUpIcon : BarsArrowDownIcon;

  return (
    <IconButton
      icon={<SortIcon />}
      size={size}
      shape={shape}
      color={color}
      disabled={disabled}
      {...rest}
    />
  );
};

export default SortButton;
