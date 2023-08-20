import { FC, useContext, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';

import Button, { ButtonVariant } from '@/components/common/ui/button';
import Rating from '@/components/common/ui/rating';
import Tag from '@/components/common/ui/tag';
import { TagColor, TagSize } from '@/components/common/ui/tag/types';
import { teacherSubjectContext } from '@/components/pages/personal-teacher-subject-page/PersonalTeacherSubjectPage';
import { TeacherRole, TeacherWithSubject } from '@/types/teacher';

import Contact from '../../../../pages/personal-teacher-subject-page/contacts/Contact';

import * as styles from './PersonalTeacherSubjectCard.styles';

const PersonalTeacherSubjectCard: FC<TeacherWithSubject> = ({
  roles,
  firstName,
  middleName,
  lastName,
  avatar,
  subject,
  rating,
  contacts,
}) => {
  const [isContactsVisible, setContactsVisibility] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);
  const { setFloatingCardShowed } = useContext(teacherSubjectContext);

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
      <Box sx={styles.subject}>
        <Typography sx={styles.subjectName} variant="h5">
          {subject.name}
        </Typography>
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

      {contacts.length > 0 && (
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

      <Box sx={styles.contacts(isContactsVisible ? `shown` : `hidden`)}>
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
export default PersonalTeacherSubjectCard;
