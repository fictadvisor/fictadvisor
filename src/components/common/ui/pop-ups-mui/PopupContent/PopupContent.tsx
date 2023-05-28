import React, { FC } from 'react';
import DialogContent from '@mui/material/DialogContent';
import { SxProps, Theme } from '@mui/material/styles';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './PopupContent.styles';

interface PopupContentProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}
const PopupContent: FC<PopupContentProps> = ({ children, sx }) => {
  return (
    <DialogContent sx={mergeSx(styles.popupContent, sx)}>
      {children}
    </DialogContent>
  );
};
export default PopupContent;
