import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

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
          {/*<Rating sx={styles.rating} rating={rating} />*/}
          <Box sx={styles.tags}>
            {roles?.includes(TeacherRole.LECTURER) && (
              <Tag color={TagColor.INFO} size={TagSize.SMALL} text="Лектор" />
            )}

            {roles?.includes(TeacherRole.PRACTICIAN) && (
              <Tag
                color={TagColor.ORANGE}
                size={TagSize.SMALL}
                text="Практик"
              />
            )}

            {roles?.includes(TeacherRole.LABORANT) && (
              <Tag color={TagColor.MINT} size={TagSize.SMALL} text="Лаборант" />
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
