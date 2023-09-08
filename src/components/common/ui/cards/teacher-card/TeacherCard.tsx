import React from 'react';
import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';

import { CardRoles } from '@/components/common/ui/cards/card-roles';
import Rating from '@/components/common/ui/rating';
import { RatingVariant } from '@/components/common/ui/rating/types';
import theme from '@/styles/theme';
import { TeacherRole } from '@/types/teacher';

import * as styles from './TeacherCard.styles';

type TeacherCardProps = {
  name: string;
  rating?: number;
  roles?: TeacherRole[];
  avatar?: string;
  disabled?: boolean;
  isSubjectCard?: boolean;
};

export const TeacherCard: React.FC<TeacherCardProps> = ({
  name,
  roles = [],
  avatar,
  disabled,
  rating = 0,
  isSubjectCard = false,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('desktopSemiMedium'));
  return (
    <Box
      sx={disabled ? styles.disabledCard : styles.teacherCard(isSubjectCard)}
    >
      <Box sx={styles.teacherCardShift(isSubjectCard)}>
        <Box sx={styles.teacherCardTopPart}>
          <Avatar
            sx={styles.teacherCardAvatar(isSubjectCard)}
            src={avatar}
            alt="викладач"
          />
          <Box sx={styles.teacherCardTopPartRating}>
            {rating !== 0 && (
              <Rating
                rating={rating}
                variant={isMobile ? RatingVariant.SHORT : RatingVariant.LONG}
              />
            )}
          </Box>
        </Box>
        {isSubjectCard && <CardRoles roles={roles} />}
        <Typography sx={styles.teacherCardName(isSubjectCard)}>
          {name}
        </Typography>
      </Box>
    </Box>
  );
};
