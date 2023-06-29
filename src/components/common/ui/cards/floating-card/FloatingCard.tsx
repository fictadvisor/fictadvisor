import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import Tag from '@/components/common/ui/tag-mui';
import Contact from '@/components/pages/personal-teacher-page/contacts';
import {
  GetTeacherDTO,
  TeacherRoles,
} from '@/lib/api/teacher/dto/GetTeacherDTO';

import * as styles from './FloatingCard.styles';

interface FloatingCardProps extends GetTeacherDTO {
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
            {roles?.includes(TeacherRoles.LECTURER) && (
              <Tag color="indigo" size="small" text="Лекції" />
            )}

            {roles?.includes(TeacherRoles.PRACTICIAN) && (
              <Tag color="orange" size="small" text="Практики" />
            )}

            {roles?.includes(TeacherRoles.LABORANT) && (
              <Tag color="mint" size="small" text="Лабораторні" />
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
