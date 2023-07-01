import { FC } from 'react';
import { Box } from '@mui/material';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Tag.styles';
import { TagColor, TagProps, TagSize, TagVariant } from './types';

const Tag: FC<TagProps> = ({
  text,
  variant = TagVariant.FILL,
  color = TagColor.PRIMARY,
  size = TagSize.MEDIUM,
  icon,
  sx = {},
}) => {
  return (
    <Box sx={mergeSx(styles.tag(variant, color, size, icon, text), sx)}>
      {icon && <Box sx={styles.icon}>{icon}</Box>}
      <p>{text}</p>
    </Box>
  );
};

export default Tag;
