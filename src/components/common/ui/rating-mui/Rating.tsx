import { FC } from 'react';
import { Icon, Rating as RatingMui, SxProps, Theme } from '@mui/material';

interface RatingProps {
  rating: number;
  sx?: SxProps<Theme>;
}

const Rating: FC<RatingProps> = ({ rating, sx }) => {
  return (
    <RatingMui
      value={rating}
      sx={sx}
      precision={0.1}
      emptyIcon={
        <Icon>
          <img src="/assets/stars-empty.svg" />
        </Icon>
      }
      icon={
        <Icon>
          <img src="/assets/stars-full.svg" />
        </Icon>
      }
      readOnly
    />
  );
};

export default Rating;
