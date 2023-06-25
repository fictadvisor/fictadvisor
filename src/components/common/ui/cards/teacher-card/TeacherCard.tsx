import React from 'react';
import { useMediaQuery } from '@mui/material';
import mergeClassNames from 'merge-class-names';

import styles from '@/components/common/ui/cards/teacher-card/TeacherCard.module.scss';
import { DivProps } from '@/components/common/ui/cards/types';
import Rating from '@/components/common/ui/rating-mui';
import { RatingVariant } from '@/components/common/ui/rating-mui/Rating';
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
  rating,
  ...rest
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('desktopSemiMedium'));
  return (
    <div
      className={mergeClassNames(
        styles['teacher-card'],
        styles['teacher-card-effect'],
        disabled && styles['card-disabled'],
      )}
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
            {rating != 0 && (
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
