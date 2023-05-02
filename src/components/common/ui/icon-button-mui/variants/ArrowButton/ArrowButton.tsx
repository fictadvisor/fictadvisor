import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

import IconButton, {
  VariantIconButtonProps,
} from '@/components/common/ui/icon-button-mui/IconButton';
import * as styles from '@/components/common/ui/icon-button-mui/variants/ArrowButton/ArrowButton.styles';

const ArrowButton: React.FC<VariantIconButtonProps> = ({
  size = 'normal',
  shape = 'square',
  color = 'secondary',
  disabled,
}) => {
  return (
    <IconButton
      icon={<ChevronLeftIcon />}
      size={size}
      shape={shape}
      color={color}
      disabled={disabled}
      sx={styles.button(size)}
      iconSx={styles.iconStyles(size)}
    ></IconButton>
  );
};
export default ArrowButton;
