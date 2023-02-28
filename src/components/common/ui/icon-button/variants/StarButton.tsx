import React from 'react';
import { StarIcon } from '@heroicons/react/24/outline';

import {
  IconButton,
  IconButtonColor,
  IconButtonProps,
  IconButtonShape,
  IconButtonSize,
} from '../IconButton';

const StarButton: React.FC<IconButtonProps> = ({
  size = IconButtonSize.MEDIUM,
  shape = IconButtonShape.CIRCLE,
  color = IconButtonColor.SUCCESS,
  ...rest
}) => {
  return (
    <IconButton
      icon={<StarIcon />}
      size={size}
      shape={shape}
      color={color}
      {...rest}
    />
  );
};

export default StarButton;
