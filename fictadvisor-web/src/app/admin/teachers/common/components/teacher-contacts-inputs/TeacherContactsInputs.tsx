'use client';
import type { FC } from 'react';
import { ContactResponse } from '@fictadvisor/utils/responses';
import { Box, Stack, Typography } from '@mui/material';

import ContactInput from './components/contact-input/ContactInput';
import { createContacts } from './components/utils/CreateContacts';
import * as styles from './TeacherContactsInputs.styles';

interface TeacherContactsInputsProps {
  contacts?: ContactResponse[];
  setContacts: React.Dispatch<React.SetStateAction<ContactResponse[]>>;
}

const TeacherContactsInputs: FC<TeacherContactsInputsProps> = ({
  contacts = [],
  setContacts,
}) => {
  const contactsAll = createContacts(contacts);
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
              setContacts={setContacts}
            />
          );
        })}
      </Box>
    </Stack>
  );
};

export default TeacherContactsInputs;
