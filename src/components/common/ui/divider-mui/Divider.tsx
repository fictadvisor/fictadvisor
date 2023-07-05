import React, { FC } from 'react';
import { Divider as MuiDivider } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Divider.styles';
import { DividerTextAlign } from './types';

interface DividerProps {
  text?: string;
  textAlign?: DividerTextAlign;
  sx?: SxProps<Theme>;
}
const Divider: FC<DividerProps> = ({
  text,
  sx = {},
  textAlign = DividerTextAlign.CENTER,
}) => {
  return (
    <MuiDivider sx={mergeSx(styles.divider, sx)} textAlign={textAlign}>
      {text}
    </MuiDivider>
  );
};

export default Divider;
