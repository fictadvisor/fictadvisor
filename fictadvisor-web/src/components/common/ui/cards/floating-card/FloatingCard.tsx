import React, { FC } from 'react';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { TeacherWithContactsResponse } from '@fictadvisor/utils/responses';
import { Box, Typography } from '@mui/material';
import Contact from 'src/app/(main)/(search-pages)/teachers/[teacherId]/contacts';

import Rating from '@/components/common/ui/rating';
import { ContactType } from '@/types/contact';

import { CardDisciplineTypes } from '../card-discipline-types/CardDisciplineTypes';

import * as styles from './FloatingCard.styles';

interface FloatingCardProps extends TeacherWithContactsResponse {
  subjectName?: string;
  disciplineTypes: DisciplineTypeEnum[];
}

const FloatingCard: FC<FloatingCardProps> = ({
  firstName,
  middleName,
  disciplineTypes,
  lastName,
  description,
  avatar,
  contacts,
  subjectName,
  rating,
  cathedras,
}) => {
  return (
    <Box sx={styles.card}>
      <Box sx={styles.top}>
        <Box src={avatar} sx={styles.image} component="img" alt="photo"></Box>
        <Box sx={styles.info}>
          <Typography
            sx={styles.title}
            component="h4"
          >{`${lastName} ${firstName} ${middleName}`}</Typography>
          {rating !== 0 && <Rating sx={styles.rating} rating={rating / 20} />}
          <Box sx={styles.tags}>
            <CardDisciplineTypes
              disciplineTypes={disciplineTypes}
              cathedras={cathedras}
            />
          </Box>
        </Box>
      </Box>

      {subjectName && (
        <Typography sx={styles.subject} component="h4">
          {subjectName}
        </Typography>
      )}

      {description && <Box>{description}</Box>}

      {contacts && contacts.length > 0 && (
        <Box sx={styles.contacts}>
          {contacts?.map((contact, index) => (
            <Contact
              key={index}
              name={contact.name as ContactType}
              displayName={contact.displayName}
              link={contact.link}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FloatingCard;
