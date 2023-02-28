import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import {
  IconButton,
  IconButtonColor,
  IconButtonProps,
  IconButtonShape,
  IconButtonSize,
} from '../IconButton';

const CloseButton: React.FC<IconButtonProps> = ({
  size = IconButtonSize.NORMAL,
  shape = IconButtonShape.SQUARE,
  color = IconButtonColor.TRANSPARENT,
  ...rest
}) => {
  return (
    <IconButton
      icon={<XMarkIcon />}
      size={size}
      shape={shape}
      color={color}
      {...rest}
    />
  );
};

export default CloseButton;
