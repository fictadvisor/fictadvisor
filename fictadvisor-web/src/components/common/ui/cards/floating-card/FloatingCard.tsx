import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import Contact from 'src/app/(main)/(search-pages)/teachers/[teacherId]/contacts';

import { CardRoles } from '@/components/common/ui/cards/card-roles';
import Rating from '@/components/common/ui/rating';
import { Teacher } from '@/types/teacher';

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
            <CardRoles roles={roles} cathedras={cathedras} />
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
