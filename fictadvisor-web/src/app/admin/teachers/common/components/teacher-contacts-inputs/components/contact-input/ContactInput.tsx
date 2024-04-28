import React, { FC, useEffect, useState } from 'react';
import { CreateContactDTO } from '@fictadvisor/utils/requests';
import { Stack } from '@mui/material';

import Input from '@/components/common/ui/form/input-mui';
import { InputSize } from '@/components/common/ui/form/input-mui/types';
import { ContactType } from '@/types/contact';

import { ContactPlaceholder } from '../constants/ContactPlaceholder';

import * as styles from './ContactInput.styles';

interface ContactInputProps {
  contact: Omit<CreateContactDTO, 'id'>;
  setNewContacts: React.Dispatch<React.SetStateAction<CreateContactDTO[]>>;
}

const ContactInput: FC<ContactInputProps> = ({ contact, setNewContacts }) => {
  const [displayName, setDisplayName] = useState<string>(contact.displayName);
  const [link, setLink] = useState<string>(contact.link as string);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNewContacts(prev => {
        const foundContact = prev.find(c => c.name === contact.name);
        if (foundContact) {
          return prev.map(c =>
            c.name === contact.name ? { ...c, displayName, link } : c,
          );
        }
        return [
          ...prev,
          { displayName, link, name: contact.name } as CreateContactDTO,
        ];
      });
      setNewContacts(prev => {
        const foundContact = prev.find(c => c.name === contact.name);
        if (foundContact) {
          if (
            foundContact.displayName === contact.displayName &&
            foundContact.link === contact.link &&
            foundContact.name === contact.name
          ) {
            return prev.filter(c => c.name !== contact.name);
          }
        }
        return prev;
      });
    }, 200);

    return () => clearTimeout(timer);
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
