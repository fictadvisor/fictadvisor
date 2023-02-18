import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

import {
  IconButton,
  IconButtonColor,
  IconButtonProps,
  IconButtonSize,
  IconType,
} from '../IconButton';

const TrashBucketButton: React.FC<IconButtonProps> = ({
  size = IconButtonSize.NORMAL,
  shape = IconType.CIRCLE,
  color = IconButtonColor.SECONDARY,
  ...rest
}) => {
  return (
    <IconButton
      icon={<TrashIcon className="icon" />}
      size={size}
      shape={shape}
      color={color}
      {...rest}
    />
  );
};

export default TrashBucketButton;
