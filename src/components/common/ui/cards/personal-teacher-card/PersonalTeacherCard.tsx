import { FC, useContext, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import { ButtonVariant } from '@/components/common/ui/button-mui/types';
import Rating from '@/components/common/ui/rating-mui';
import Tag from '@/components/common/ui/tag-mui';
import { TagColor, TagSize } from '@/components/common/ui/tag-mui/types';
import { teacherContext } from '@/components/pages/personal-teacher-page/PersonalTeacherPage';
import { Teacher, TeacherRole } from '@/types/teacher';

import Contact from '../../../../pages/personal-teacher-page/contacts/Contact';

import * as styles from './PersonalTeacherCard.styles';

const PersonalTeacherCard: FC<Teacher> = ({
  roles,
  firstName,
  middleName,
  lastName,
  avatar,
  description,
  rating,
  contacts,
}) => {
  const [isContactsVisible, setContactsVisibility] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);
  const { setFloatingCardShowed } = useContext(teacherContext);
  const contactsStatus = isContactsVisible ? 'shown' : 'hidden';
  useEffect(() => {
    const handleScroll = () => {
      const bottom = blockRef.current?.getBoundingClientRect().bottom;
      if (Number(bottom) < 0) {
        setFloatingCardShowed(true);
      } else {
        setFloatingCardShowed(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <Box ref={blockRef} sx={styles.card}>
      <Box sx={styles.photo}>
        <Box component="img" sx={styles.image} src={avatar} alt="photo" />
      </Box>
      <Box sx={styles.nameAndRating}>
        <Typography variant="h4" sx={styles.name}>
          {lastName + ' ' + firstName + ' ' + middleName}
        </Typography>
        {rating !== 0 && <Rating rating={rating / 20} />}
      </Box>

      <Box sx={styles.tags}>
        {roles.includes(TeacherRole.LECTURER) && (
          <Tag
            sx={styles.tag}
            color={TagColor.INDIGO}
            size={TagSize.SMALL}
            text="Лекції"
          />
        )}

        {roles.includes(TeacherRole.PRACTICIAN) && (
          <Tag
            sx={styles.tag}
            color={TagColor.ORANGE}
            size={TagSize.SMALL}
            text="Практики"
          />
        )}

        {roles.includes(TeacherRole.LABORANT) && (
          <Tag
            sx={styles.tag}
            color={TagColor.MINT}
            size={TagSize.SMALL}
            text="Лабораторні"
          />
        )}
      </Box>
      <Box sx={styles.info}>{description}</Box>
      {contacts.length !== 0 && (
        <Box sx={styles.contactsButton}>
          <Button
            text="Контакти"
            endIcon={
              isContactsVisible ? <ChevronUpIcon /> : <ChevronDownIcon />
            }
            variant={ButtonVariant.TEXT}
            onClick={() => setContactsVisibility(!isContactsVisible)}
          />
        </Box>
      )}
      <Box sx={styles.contacts(contactsStatus)}>
        {contacts.map((contact, index) => (
          <Box key={index} sx={styles.contactsItem}>
            <Contact
              name={contact.name}
              displayName={contact.displayName}
              link={contact.link}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default PersonalTeacherCard;
