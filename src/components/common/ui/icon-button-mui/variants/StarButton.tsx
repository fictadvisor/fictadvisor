import React from 'react';
import { StarIcon } from '@heroicons/react/24/outline';

import IconButton, {
  VariantIconButtonProps,
} from '@/components/common/ui/icon-button-mui/IconButton';

const StarButton: React.FC<VariantIconButtonProps> = ({
  size = 'normal',
  shape = 'circle',
  color = 'success',
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
