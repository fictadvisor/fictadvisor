import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

import IconButton from '@/components/common/ui/icon-button-mui/IconButton';
import {
  IconButtonColor,
  IconButtonShape,
  IconButtonSize,
  VariantIconButtonProps,
} from '@/components/common/ui/icon-button-mui/types';
import * as styles from '@/components/common/ui/icon-button-mui/variants/ArrowButton/ArrowButton.styles';

const ArrowButton: React.FC<VariantIconButtonProps> = ({
  size = IconButtonSize.NORMAL,
  shape = IconButtonShape.SQUARE,
  color = IconButtonColor.SECONDARY,
  disabled,
  ...rest
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
      {...rest}
    ></IconButton>
  );
};
export default ArrowButton;
