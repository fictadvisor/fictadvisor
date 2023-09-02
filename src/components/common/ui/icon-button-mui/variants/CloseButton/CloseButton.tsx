import { FC } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import IconButton from '@/components/common/ui/icon-button-mui/IconButton';
import {
  IconButtonColor,
  IconButtonShape,
  IconButtonSize,
  VariantIconButtonProps,
} from '@/components/common/ui/icon-button-mui/types';

const CloseButton: FC<VariantIconButtonProps> = ({
  size = IconButtonSize.LARGE,
  shape = IconButtonShape.SQUARE,
  color = IconButtonColor.TRANSPARENT,
  disabled,
  ...rest
}) => {
  return (
    <IconButton
      icon={<XMarkIcon />}
      size={size}
      shape={shape}
      color={color}
      disabled={disabled}
      {...rest}
    />
  );
};
export default CloseButton;
