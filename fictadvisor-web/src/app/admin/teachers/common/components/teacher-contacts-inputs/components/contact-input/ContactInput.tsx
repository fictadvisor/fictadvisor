import React, { FC, useEffect, useState } from 'react';
import { ContactResponse } from '@fictadvisor/utils/responses';
import { Stack } from '@mui/material';

import Input from '@/components/common/ui/form/input-mui';
import { InputSize } from '@/components/common/ui/form/input-mui/types';
import { ContactType } from '@/types/contact';

import { ContactPlaceholder } from '../constants/ContactPlaceholder';

import * as styles from './ContactInput.styles';

interface ContactInputProps {
  contact: ContactResponse;
  setContacts: React.Dispatch<React.SetStateAction<ContactResponse[]>>;
}

const ContactInput: FC<ContactInputProps> = ({ contact, setContacts }) => {
  const [displayName, setDisplayName] = useState<string>(contact.displayName);
  const [link, setLink] = useState<string>(contact.link);

  useEffect(() => {
    setContacts(prev => {
      const foundContact = prev.find(c => c.name === contact.name);

      if (displayName === '' && [':', '/'].includes(link.at(-1) ?? '/'))
        return [...prev.filter(c => c.name !== contact.name)];

      if (foundContact) {
        return prev.map(c =>
          c.name === contact.name ? { ...c, displayName, link } : c,
        );
      }
      return [...prev, { id: '', displayName, link, name: contact.name }];
    });
  }, [displayName, link]);

  return (
    <Stack sx={styles.wrapper}>
      <Input
        size={InputSize.MEDIUM}
        sx={styles.input}
        label={ContactPlaceholder[contact.name as ContactType]}
        value={displayName}
        onChange={setDisplayName}
      />
      <Input
        size={InputSize.MEDIUM}
        sx={styles.inputLink}
        label="Посилання"
        value={link}
        onChange={setLink}
      />
    </Stack>
  );
};

export default ContactInput;
