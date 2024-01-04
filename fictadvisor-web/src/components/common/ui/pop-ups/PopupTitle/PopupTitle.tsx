import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { SxProps, Theme } from '@mui/material/styles';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './PopupTitle.styles';

interface PopupTitleProps {
  id?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  withCross?: boolean;
  sx?: SxProps<Theme>;
}

const BootstrapDialogTitle: FC<PopupTitleProps> = ({
  children,
  onClose,
  sx = {},
  ...rest
}) => {
  return (
    <DialogTitle sx={mergeSx(styles.dialogTitle, sx)} {...rest}>
      {children}
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={mergeSx(styles.iconButton, sx)}
        >
          <CloseIcon />
        </IconButton>
      )}
    </DialogTitle>
  );
};

const PopupTitle: FC<PopupTitleProps> = ({
  id = 'customized-dialog-title',
  children,
  onClose,
  withCross = false,
  sx = {},
  ...rest
}) => {
  return withCross ? (
    <BootstrapDialogTitle id={id} onClose={onClose} sx={sx} {...rest}>
      {children}
    </BootstrapDialogTitle>
  ) : (
    <DialogTitle sx={mergeSx(styles.dialogTitle, sx)}>{children}</DialogTitle>
  );
};

export default PopupTitle;
