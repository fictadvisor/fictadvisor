import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

import IconButton from '@/components/common/ui/icon-button-mui/IconButton';
import {
  IconButtonColor,
  IconButtonShape,
  IconButtonSize,
  VariantIconButtonProps,
} from '@/components/common/ui/icon-button-mui/types';

const TrashBucketButton: React.FC<VariantIconButtonProps> = ({
  size = IconButtonSize.NORMAL,
  shape = IconButtonShape.CIRCLE,
  color = IconButtonColor.ERROR,
  disabled,
  ...rest
}) => {
  return (
    <IconButton
      icon={<TrashIcon />}
      size={size}
      shape={shape}
      color={color}
      disabled={disabled}
      {...rest}
    />
  );
};

export default TrashBucketButton;
