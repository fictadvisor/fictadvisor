import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

import {
  IconButton,
  IconButtonColor,
  IconButtonProps,
  IconButtonShape,
  IconButtonSize,
} from '../IconButton';

const TrashBucketButton: React.FC<IconButtonProps> = ({
  size = IconButtonSize.NORMAL,
  shape = IconButtonShape.CIRCLE,
  color = IconButtonColor.ERROR,
  ...rest
}) => {
  return (
    <IconButton
      icon={<TrashIcon />}
      size={size}
      shape={shape}
      color={color}
      {...rest}
    />
  );
};

export default TrashBucketButton;
