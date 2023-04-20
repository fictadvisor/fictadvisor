import React, { FC } from 'react';
import { Divider as DividerMui } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Divider.styles';

interface DividerProps {
  text?: string;
  textAlign?: 'right' | 'left' | 'center';
  sx?: SxProps<Theme>;
}

const Divider: FC<DividerProps> = ({ text, sx, textAlign = 'center' }) => {
  return (
    <DividerMui sx={mergeSx(styles.divider, sx)} textAlign={textAlign}>
      {text}
    </DividerMui>
  );
};

export default Divider;
