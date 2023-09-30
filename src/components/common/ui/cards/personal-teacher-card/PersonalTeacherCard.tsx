import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import { ButtonVariant } from '@/components/common/ui/button-mui/types';
import { CardRoles } from '@/components/common/ui/cards/card-roles';
import Rating from '@/components/common/ui/rating';
import { teacherContext } from '@/components/pages/personal-teacher-page/PersonalTeacherPage';
import { teacherSubjectContext } from '@/components/pages/personal-teacher-subject-page/PersonalTeacherSubjectPage';
import { Contact } from '@/types/contact';
import { TeacherRole, TeacherSubject } from '@/types/teacher';

import Contacts from '../../../../pages/personal-teacher-page/contacts/Contact';

import * as styles from './PersonalTeacherCard.styles';

interface TeacherCard {
  id: string;
  roles: TeacherRole[];
  firstName: string;
  middleName: string;
  lastName: string;
  avatar: string;
  description: string;
  rating: number;
  contacts: Contact[];
  subject?: TeacherSubject;
  isSubjectCard?: boolean;
}

const PersonalTeacherCard: FC<TeacherCard> = ({
  roles,
  firstName,
  middleName,
  lastName,
  avatar,
  description,
  rating,
  contacts,
  subject,
  isSubjectCard = false,
}) => {
  const [isContactsVisible, setContactsVisibility] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);
  const { setFloatingCardShowed } = useContext(teacherContext);
  const { setSubjectFloatingCardShowed } = useContext(teacherSubjectContext);
  const contactsStatus = isContactsVisible ? 'shown' : 'hidden';
  useEffect(() => {
    const handleScroll = () => {
      const bottom = blockRef.current?.getBoundingClientRect().bottom;
      if (Number(bottom) < 0) {
        setFloatingCardShowed(true);
        setSubjectFloatingCardShowed(true);
      } else {
        setFloatingCardShowed(false);
        setSubjectFloatingCardShowed(false);
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
      <Box sx={styles.nameAndRating(isSubjectCard)}>
        <Typography variant="h4" sx={styles.name}>
          {lastName + ' ' + firstName + ' ' + middleName}
        </Typography>
        {rating !== 0 && <Rating rating={rating / 20} />}
      </Box>
      {subject && (
        <Box sx={styles.subject}>
          <Typography sx={styles.subjectName} variant="h5">
            {subject.name}
          </Typography>
        </Box>
      )}
      <Box sx={styles.tags(isSubjectCard)}>
        <CardRoles roles={roles} />
      </Box>
      {!isSubjectCard && (
        <Box sx={styles.info}>
          <Typography>{description}</Typography>
        </Box>
      )}
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
            <Contacts
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
