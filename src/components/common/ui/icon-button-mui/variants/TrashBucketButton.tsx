import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

import IconButton, {
  VariantIconButtonProps,
} from '@/components/common/ui/icon-button-mui/IconButton';

const TrashBucketButton: React.FC<VariantIconButtonProps> = ({
  size = 'normal',
  shape = 'circle',
  color = 'error',
  disabled,
}) => {
  return (
    <IconButton
      icon={<TrashIcon />}
      size={size}
      shape={shape}
      color={color}
      disabled={disabled}
    />
  );
};

export default TrashBucketButton;
