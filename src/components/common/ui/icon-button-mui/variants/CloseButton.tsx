import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import IconButton, {
  VariantIconButtonProps,
} from '@/components/common/ui/icon-button-mui/IconButton';

const CloseButton: React.FC<VariantIconButtonProps> = ({
  size = 'large',
  shape = 'square',
  color = 'transparent',
  disabled,
}) => {
  return (
    <IconButton
      icon={<XMarkIcon />}
      size={size}
      shape={shape}
      color={color}
      disabled={disabled}
    ></IconButton>
  );
};
export default CloseButton;
