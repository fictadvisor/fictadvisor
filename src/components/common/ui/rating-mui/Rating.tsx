import { FC } from 'react';
import { Box, Icon, Rating as MuiRating, SxProps, Theme } from '@mui/material';

import StarsEmpty from '@/components/common/icons/StarsEmpty';
import StarsFull from '@/components/common/icons/StarsFull';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Rating.styles';
import { RatingVariant } from './types';

interface RatingProps {
  rating: number;
  variant?: RatingVariant;
  sx?: SxProps<Theme>;
}

const Rating: FC<RatingProps> = ({
  rating,
  variant = RatingVariant.LONG,
  sx = {},
}) => {
  const isLongVariant = variant === RatingVariant.LONG;
  const maxStarsNumber = isLongVariant ? 5 : 1;
  const value = isLongVariant ? rating : rating / 5;
  const ratingText = isLongVariant ? rating.toFixed(2) : rating.toFixed(1);
  const precision = isLongVariant ? 0.1 : 0.02;

  return (
    <Box sx={mergeSx(styles.rating(variant), sx)}>
      {!isLongVariant && <Box>{ratingText}</Box>}
      <MuiRating
        value={value}
        sx={styles.ratingStars}
        precision={precision}
        max={maxStarsNumber}
        emptyIcon={
          <Icon>
            <StarsEmpty />
            {/*<img src="/icons/stars-empty.svg" alt="stars" />*/}
          </Icon>
        }
        icon={
          <Icon>
            <StarsFull />
            {/*<img src="/icons/stars-full.svg" alt="stars" />*/}
          </Icon>
        }
        readOnly
      />
      {isLongVariant && <Box>{ratingText}</Box>}
    </Box>
  );
};

export default Rating;
