'use client';

import { FC } from 'react';
import { Box } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import { EclipseSize, EclipseType } from '@/app/about/types';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Eclipse.styles';

interface EclipseProps {
  size: EclipseSize;
  type: EclipseType;
  opacity: number;
  sx?: SxProps<Theme>;
}

const Eclipse: FC<EclipseProps> = ({
  size,
  type,
  opacity,
  sx = {},
  ...rest
}) => {
  return (
    <Box {...rest} sx={mergeSx(styles.eclipse(size, type, opacity), sx)} />
  );
};

export default Eclipse;
