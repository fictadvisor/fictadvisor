import React from 'react';

import SortAscending from '@/components/common/custom-svg/SortAscending';
import SortDescending from '@/components/common/custom-svg/SortDescending';
import IconButton, {
  VariantIconButtonProps,
} from '@/components/common/ui/icon-button-mui/IconButton';

const SortButton: React.FC<
  VariantIconButtonProps & {
    order?: 'ascending' | 'descending';
  }
> = ({
  size = 'normal',
  shape = 'square',
  order = 'ascending',
  color = 'secondary',
  disabled,
}) => {
  const SortIcon = order === 'ascending' ? SortAscending : SortDescending;

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
