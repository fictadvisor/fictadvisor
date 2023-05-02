import React from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { Box } from '@mui/material';

import IconButton from '@/components/common/ui/icon-button-mui';
import { IconButtonColorType } from '@/components/common/ui/icon-button-mui/IconButton';
import {
  ArrowButton,
  CloseButton,
  SortButton,
  StarButton,
  TrashBucketButton,
} from '@/components/common/ui/icon-button-mui/variants';

import * as styles from './IconButtonTestPage.styles';

const ColorMap: Array<IconButtonColorType> = [
  'primary',
  'error',
  'success',
  'secondary',
];
const IconButtonTestPage = () => {
  return (
    <Box sx={styles.wrapper}>
      {ColorMap.map((color, index) => (
        <Box sx={styles.wrapperMini} key={index}>
          <IconButton icon={<StarIcon />} color={color}></IconButton>
          <IconButton
            size="large"
            icon={<StarIcon />}
            color={color}
          ></IconButton>
          <IconButton
            icon={<StarIcon />}
            shape="circle"
            color={color}
          ></IconButton>
          <IconButton
            size="large"
            icon={<StarIcon />}
            shape="circle"
            color={color}
            href="https://www.youtube.com/watch?v=t_Dt0E-KQH0"
          ></IconButton>

          <IconButton icon={<StarIcon />} color={color} disabled></IconButton>
          <IconButton
            size="large"
            icon={<StarIcon />}
            color={color}
            disabled
          ></IconButton>
        </Box>
      ))}
      <Box sx={styles.wrapperMini}>
        <CloseButton></CloseButton>
        <CloseButton size="normal"></CloseButton>
      </Box>
      <Box sx={styles.wrapperMini}>
        <SortButton></SortButton>
        <SortButton size="large"></SortButton>
        <SortButton order="descending"></SortButton>
        <SortButton order="descending" size="large"></SortButton>
      </Box>
      <Box sx={styles.wrapperMini}>
        <StarButton></StarButton>
        <StarButton size="large"></StarButton>
      </Box>
      <Box sx={styles.wrapperMini}>
        <TrashBucketButton></TrashBucketButton>
        <TrashBucketButton size="large"></TrashBucketButton>
      </Box>
      <Box sx={styles.wrapperMini}>
        <ArrowButton></ArrowButton>
        <ArrowButton size="large"></ArrowButton>
      </Box>
    </Box>
  );
};

export default IconButtonTestPage;
