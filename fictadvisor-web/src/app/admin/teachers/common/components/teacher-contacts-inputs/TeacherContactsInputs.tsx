'use client';
import type { FC } from 'react';
import { CreateContactDTO } from '@fictadvisor/utils/requests';
import { Box, Stack, Typography } from '@mui/material';

import ContactInput from './components/contact-input/ContactInput';
import { createContacts } from './components/utils/CreateContacts';
import * as styles from './TeacherContactsInputs.styles';

interface TeacherContactsInputsProps {
  contacts?: CreateContactDTO[];
  setNewContacts: React.Dispatch<React.SetStateAction<CreateContactDTO[]>>;
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
