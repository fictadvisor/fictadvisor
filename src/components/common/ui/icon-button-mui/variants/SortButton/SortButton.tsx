import React from 'react';

import SortAscending from '@/components/common/icons/SortAscending';
import SortDescending from '@/components/common/icons/SortDescending';
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
}) => {
  const SortIcon =
    order === IconButtonOrder.ASCENDING ? SortAscending : SortDescending;

  return (
    <IconButton
      icon={<SortIcon />}
      size={size}
      shape={shape}
      color={color}
      disabled={disabled}
    />
  );
};

export default SortButton;
