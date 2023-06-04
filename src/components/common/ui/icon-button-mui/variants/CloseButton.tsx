import { FC } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import IconButton, {
  VariantIconButtonProps,
} from '@/components/common/ui/icon-button-mui/IconButton';

const CloseButton: FC<VariantIconButtonProps> = ({
  size = 'large',
  shape = 'square',
  color = 'transparent',
  onClick,
  disabled,
}) => {
  return (
    <IconButton
      icon={<XMarkIcon />}
      size={size}
      shape={shape}
      color={color}
      onClick={onClick}
      disabled={disabled}
    />
  );
};
export default CloseButton;
