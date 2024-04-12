'use client';
import type { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { Contact } from '@/types/contact';

import ContactInput from './components/contact-input/ContactInput';
import { createContacts } from './components/utils/CreateContacts';
import * as styles from './TeacherContactsInputs.styles';

interface TeacherContactsInputsProps {
  contacts?: Contact[];
  setNewContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const TeacherContactsInputs: FC<TeacherContactsInputsProps> = ({
  contacts: teacherContacts = [],
  setNewContacts,
}) => {
  const contactsAll = createContacts(teacherContacts);
  return (
    <Stack sx={styles.wrapper}>
      <Typography component="div" sx={styles.subtitle}>
        Контакти
      </Typography>
      <Box sx={styles.contactsWrapper}>
        {contactsAll.map(contact => {
          return (
            <ContactInput
              key={contact.name}
              contact={contact}
              setNewContacts={setNewContacts}
            />
          );
        })}
      </Box>
    </Stack>
  );
};

export default TeacherContactsInputs;
