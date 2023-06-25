import React from 'react';
import { useMediaQuery } from '@mui/material';
import mergeClassNames from 'merge-class-names';

import { CardRoles } from '@/components/common/ui/cards/card-roles';
import styles from '@/components/common/ui/cards/subject-teacher-card/SubjectTeacherCard.module.scss';
import { DivProps } from '@/components/common/ui/cards/types';
import Rating from '@/components/common/ui/rating-mui';
import { RatingVariant } from '@/components/common/ui/rating-mui/Rating';
import { TeacherRoles } from '@/lib/api/teacher/dto/GetTeacherDTO';
import theme from '@/styles/theme';

type SubjectTeacherCardProps = {
  name: string;
  rating?: number;
  roles?: TeacherRoles[];
  avatar?: string;
  disabled?: boolean;
} & DivProps;

export const SubjectTeacherCard: React.FC<SubjectTeacherCardProps> = ({
  name,
  roles,
  avatar,
  disabled,
  rating,
  ...rest
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('desktopSemiMedium'));
  return (
    <div
      className={mergeClassNames(
        styles['subject-teacher-card'],
        styles['subject-teacher-card-effect'],
        disabled && styles['card-disabled'],
      )}
      {...rest}
    >
      <div className={styles['subject-teacher-card-shift']}>
        <div className={styles['subject-teacher-card-top-part']}>
          <img
            className={styles['subject-teacher-card-avatar']}
            src={avatar}
            alt="викладач"
          />
          <div className={styles['subject-teacher-card-top-part-rating']}>
            {rating != 0 && (
              <Rating
                rating={rating}
                variant={isMobile ? RatingVariant.SHORT : RatingVariant.LONG}
              />
            )}
          </div>
        </div>
        <CardRoles
          roles={roles}
          className={styles['subject-teacher-card-roles']}
        />
        <h4 className={styles['subject-teacher-card-name']}>{name}</h4>
      </div>
    </div>
  );
};
