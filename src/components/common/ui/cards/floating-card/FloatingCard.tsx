import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import Rating from '@/components/common/ui/rating-mui';
import Tag from '@/components/common/ui/tag-mui';
import { TagColor, TagSize } from '@/components/common/ui/tag-mui/types';
import Contact from '@/components/pages/personal-teacher-page/contacts';
import { Teacher, TeacherRole } from '@/types/teacher';

import * as styles from './FloatingCard.styles';

interface FloatingCardProps extends Teacher {
  subjectName?: string;
}

const FloatingCard: FC<FloatingCardProps> = ({
  firstName,
  middleName,
  lastName,
  description,
  avatar,
  roles,
  contacts,
  subjectName,
  rating,
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
            {roles?.includes(TeacherRole.LECTURER) && (
              <Tag color={TagColor.INDIGO} size={TagSize.SMALL} text="Лекції" />
            )}

            {roles?.includes(TeacherRole.PRACTICIAN) && (
              <Tag
                color={TagColor.ORANGE}
                size={TagSize.SMALL}
                text="Практики"
              />
            )}

            {roles?.includes(TeacherRole.LABORANT) && (
              <Tag
                color={TagColor.MINT}
                size={TagSize.SMALL}
                text="Лабораторні"
              />
            )}
          </Box>
        </Box>
      </Box>

      {subjectName && (
        <Typography sx={styles.subject} component="h4">
          {subjectName}
        </Typography>
      )}

      {description && <Box>{description}</Box>}

      {contacts.length > 0 && (
        <Box sx={styles.contacts}>
          {contacts?.map((contact, index) => (
            <Contact
              key={index}
              name={contact.name}
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
