import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import {
  CathedraResponse,
  ContactResponse,
} from '@fictadvisor/utils/responses';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';

import Contacts from '@/app/(main)/(search-pages)/teachers/[teacherId]/contacts/Contact';
import { teacherContext } from '@/app/(main)/(search-pages)/teachers/[teacherId]/utils';
import teacherSubjectContext from '@/app/(main)/discipline/utils/teacherSubjectContext';
import Button from '@/components/common/ui/button-mui';
import { ButtonVariant } from '@/components/common/ui/button-mui/types';
import Rating from '@/components/common/ui/rating';
import { Contact, ContactType } from '@/types/contact';
import {
  TeacherAcademicStatus,
  TeacherPosition,
  TeacherScientificDegree,
  TeacherSubject,
} from '@/types/teacher';

import { CardDisciplineTypes } from '../card-discipline-types/CardDisciplineTypes';

import * as styles from './PersonalTeacherCard.styles';

interface TeacherCard {
  id: string;
  disciplineTypes: DisciplineTypeEnum[];
  firstName: string;
  middleName: string;
  lastName: string;
  avatar: string;
  description: string;
  rating: number;
  contacts: ContactResponse[];
  cathedras: CathedraResponse[];
  subject?: TeacherSubject;
  academicStatus: string;
  scientificDegree: string;
  position: string;
  isSubjectCard?: boolean;
}

const PersonalTeacherCard: FC<TeacherCard> = ({
  firstName,
  middleName,
  disciplineTypes,
  lastName,
  avatar,
  description,
  rating,
  contacts,
  cathedras,
  subject,
  academicStatus,
  scientificDegree,
  position,
  isSubjectCard = false,
}) => {
  const [isContactsVisible, setContactsVisibility] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);
  const { setFloatingCardShowed } = useContext(teacherContext);
  const { setSubjectFloatingCardShowed } = useContext(teacherSubjectContext);
  const contactsStatus = isContactsVisible ? 'shown' : 'hidden';
  const scientificFields = [
    TeacherAcademicStatus[academicStatus],
    TeacherScientificDegree[scientificDegree],
    TeacherPosition[position],
  ].filter(field => field !== undefined);

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
        <Box
          component="img"
          sx={styles.image}
          src={avatar || '/images/default-avatar.jpeg'}
          alt="photo"
        />
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
        <CardDisciplineTypes
          disciplineTypes={disciplineTypes}
          cathedras={cathedras}
          isPersonalPage={true}
        />
      </Box>
      <Box sx={styles.scienceInfo(isSubjectCard)}>
        <Typography textTransform="none">
          {scientificFields.join(', ')}
        </Typography>
      </Box>
      {!isSubjectCard && (
        <Box sx={styles.info}>
          <Typography textTransform="none">{description}</Typography>
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
              name={contact.name as ContactType}
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
