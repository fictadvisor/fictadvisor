import { FC } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

import IconButton from '@/components/common/ui/icon-button-mui/IconButton';
import {
  IconButtonColor,
  IconButtonShape,
  IconButtonSize,
  VariantIconButtonProps,
} from '@/components/common/ui/icon-button-mui/types';
import * as styles from '@/components/common/ui/icon-button-mui/variants/ExportButton/ExportButton.styles';

const ExportButton: FC<VariantIconButtonProps> = ({
  size = IconButtonSize.LARGE,
  shape = IconButtonShape.SQUARE,
  color = IconButtonColor.PRIMARY,
  disabled,
  ...rest
}) => {
  return (
    <IconButton
      icon={<ArrowDownTrayIcon />}
      size={size}
      shape={shape}
      color={color}
      disabled={disabled}
      iconSx={styles.iconStyles(size)}
      {...rest}
    />
  );
};
export default ExportButton;
