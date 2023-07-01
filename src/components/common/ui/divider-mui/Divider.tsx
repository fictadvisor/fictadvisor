import React, { FC } from 'react';
import { Divider as MuiDivider } from '@mui/material';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Divider.styles';
import { DividerProps, DividerTextAlign } from './types';

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
