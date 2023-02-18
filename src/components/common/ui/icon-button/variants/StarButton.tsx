import React from 'react';
import { StarIcon } from '@heroicons/react/24/outline';

import {
  IconButton,
  IconButtonColor,
  IconButtonProps,
  IconButtonSize,
  IconType,
} from '../IconButton';

const StarButton: React.FC<IconButtonProps> = ({
  size = IconButtonSize.NORMAL,
  shape = IconType.CIRCLE,
  color = IconButtonColor.SUCCESS,
  ...rest
}) => {
  return (
    <IconButton
      icon={<StarIcon className="icon" />}
      size={size}
      shape={shape}
      color={color}
      {...rest}
    />
  );
};

export default StarButton;
