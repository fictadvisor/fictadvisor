import React, { FC } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { SxProps, Theme } from '@mui/material/styles';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './PopupActions.styles';
interface PopupActionsProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}
const PopupActions: FC<PopupActionsProps> = ({ children, sx }) => {
  return (
    <DialogActions sx={mergeSx(styles.popupActions, sx)}>
      {children}
    </DialogActions>
  );
};

export default PopupActions;
