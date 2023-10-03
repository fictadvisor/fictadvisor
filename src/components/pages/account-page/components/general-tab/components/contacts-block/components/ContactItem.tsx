import React, { FC } from 'react';
import { QueryObserverBaseResult } from 'react-query';
import { Box } from '@mui/material';
import Link from 'next/link';

import Input from '@/components/common/ui/form/input-mui';
import { TrashBucketButton } from '@/components/common/ui/icon-button-mui/variants';
import * as styles from '@/components/pages/account-page/components/general-tab/components/contacts-block/ContactsBlock.styles';
import { Contact } from '@/components/pages/account-page/components/general-tab/components/contacts-block/types';
import useAuthentication from '@/hooks/use-authentication';
import UserAPI from '@/lib/api/user/UserAPI';
interface ContactProps extends Contact {
  refetchContacts: QueryObserverBaseResult['refetch'];
}
const ContactItem: FC<ContactProps> = ({
  refetchContacts,
  link,
  name,
  displayName,
}) => {
  const { user } = useAuthentication();
  const handleDeleteClick = async () => {
    await UserAPI.deleteContact(user.id, name);
    refetchContacts();
  };

  return (
    <Box sx={styles.contactItem}>
      <Link href={link}>
        <Input
          readOnly
          onChange={() => {}}
          name={name}
          value={displayName}
          label={name}
        />
      </Link>
      <TrashBucketButton onClick={handleDeleteClick} />
    </Box>
  );
};

export default ContactItem;
