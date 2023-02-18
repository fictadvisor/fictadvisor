import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import {
  IconButton,
  IconButtonColor,
  IconButtonProps,
  IconButtonSize,
  IconType,
} from '../IconButton';

const CloseButton: React.FC<IconButtonProps> = ({
  size = IconButtonSize.NORMAL,
  shape = IconType.SQUARE,
  color = IconButtonColor.TRANSPARENT,
  ...rest
}) => {
  return (
    <IconButton
      icon={<XMarkIcon className="icon" />}
      size={size}
      shape={shape}
      color={color}
      {...rest}
    />
  );
};

export default CloseButton;
