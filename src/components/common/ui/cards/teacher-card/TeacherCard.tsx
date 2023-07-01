import React from 'react';
import { useMediaQuery } from '@mui/material';
import cn from 'classnames';

import styles from '@/components/common/ui/cards/teacher-card/TeacherCard.module.scss';
import { DivProps } from '@/components/common/ui/cards/types';
import Rating from '@/components/common/ui/rating-mui';
import { RatingVariant } from '@/components/common/ui/rating-mui/types';
import theme from '@/styles/theme';

type TeacherCardProps = {
  name: string;
  avatar?: string;
  rating?: number;
  disabled?: boolean;
} & DivProps;

export const TeacherCard: React.FC<TeacherCardProps> = ({
  name,
  avatar,
  disabled,
  rating = 0,
  ...rest
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('desktopSemiMedium'));
  return (
    <div
      className={cn(styles['teacher-card'], styles['teacher-card-effect'], {
        [styles['card-disabled']]: disabled,
      })}
      {...rest}
    >
      <div className={styles['teacher-card-shift']}>
        <div className={styles['teacher-card-top-part']}>
          <img
            className={styles['teacher-card-avatar']}
            src={avatar}
            alt="викладач"
          />
          <div className={styles['teacher-card-top-part-rating']}>
            {rating !== 0 && (
              <Rating
                rating={rating}
                variant={isMobile ? RatingVariant.SHORT : RatingVariant.LONG}
              />
            )}
          </div>
        </div>
        <h4 className={styles['teacher-card-name']}>{name}</h4>
      </div>
    </div>
  );
};
