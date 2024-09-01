import React from 'react';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { CathedraResponse } from '@fictadvisor/utils/responses';
import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';

import Rating from '@/components/common/ui/rating';
import { RatingVariant } from '@/components/common/ui/rating/types';
import theme from '@/styles/theme';

import { CardDisciplineTypes } from '../card-discipline-types/CardDisciplineTypes';

import * as styles from './TeacherCard.styles';

type TeacherCardProps = {
  name: string;
  rating?: number;
  cathedras?: CathedraResponse[];
  disciplineTypes?: DisciplineTypeEnum[];
  avatar?: string;
  disabled?: boolean;
  isSubjectCard?: boolean;
};

export const TeacherCard: React.FC<TeacherCardProps> = ({
  name,
  disciplineTypes = [],
  avatar,
  disabled,
  rating = 0,
  cathedras = [],
  isSubjectCard = false,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('desktopSemiMedium'));
  return (
    <Box
      sx={disabled ? styles.disabledCard : styles.teacherCard(isSubjectCard)}
    >
      <Box sx={styles.teacherCardShift}>
        <Box sx={styles.teacherCardTopPart}>
          <Avatar
            sx={styles.teacherCardAvatar}
            src={avatar || '/images/default-avatar.jpeg'}
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

        <CardDisciplineTypes
          disciplineTypes={disciplineTypes}
          cathedras={cathedras}
          isTeachersPage={!isSubjectCard}
        />
        <Typography sx={styles.teacherCardName(isSubjectCard)}>
          {name}
        </Typography>
      </Box>
    </Box>
  );
};
