import { FC } from 'react';
import { Icon, Rating as RatingMui, SxProps, Theme } from '@mui/material';

export enum RatingVariant {
  LONG = 'long',
  SHORT = 'short',
}
interface RatingProps {
  rating: number;
  variant?: RatingVariant;
  sx?: SxProps<Theme>;
}

const Rating: FC<RatingProps> = ({
  rating,
  variant = RatingVariant.LONG,
  sx,
}) => {
  const maxStarsNumber = variant === RatingVariant.LONG ? 5 : 1;
  const number = variant === RatingVariant.LONG ? rating : rating / 5;
  const precision = variant === RatingVariant.LONG ? 0.1 : 0.02;
  return (
    <RatingMui
      value={number}
      sx={sx}
      precision={precision}
      max={maxStarsNumber}
      emptyIcon={
        <Icon>
          <img src="/icons/stars-empty.svg" alt="stars" />
        </Icon>
      }
      icon={
        <Icon>
          <img src="/icons/stars-full.svg" alt="stars" />
        </Icon>
      }
      readOnly
    />
  );
};

export default Rating;
