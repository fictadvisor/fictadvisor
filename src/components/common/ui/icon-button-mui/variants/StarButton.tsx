import React from 'react';
import { StarIcon } from '@heroicons/react/24/outline';

import IconButton from '@/components/common/ui/icon-button-mui/IconButton';
import {
  IconButtonColor,
  IconButtonShape,
  IconButtonSize,
  VariantIconButtonProps,
} from '@/components/common/ui/icon-button-mui/types';

const StarButton: React.FC<VariantIconButtonProps> = ({
  size = IconButtonSize.NORMAL,
  shape = IconButtonShape.CIRCLE,
  color = IconButtonColor.SUCCESS,
  disabled,
}) => {
  return (
    <IconButton
      icon={<StarIcon />}
      size={size}
      shape={shape}
      color={color}
      disabled={disabled}
    />
  );
};

export default StarButton;
