import React, { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Tag.styles';

export type TagColorType =
  | 'primary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'secondary'
  | 'violet'
  | 'mint'
  | 'orange';

interface TagProps {
  text: string;
  size?: 'medium' | 'small';
  color?: TagColorType;
  variant?: 'fill' | 'outline' | 'darker';
  icon?: ReactNode;
  sx?: SxProps<Theme>;
}
const Tag: FC<TagProps> = ({
  text,
  variant = 'fill',
  color = 'primary',
  size = 'medium',
  icon,
  sx,
}) => {
  return (
    <Box sx={mergeSx(styles.tag(variant, color, size, icon), sx)}>
      {icon && <Box sx={styles.icon}>{icon}</Box>}
      <p>{text}</p>
    </Box>
  );
};

export default Tag;
