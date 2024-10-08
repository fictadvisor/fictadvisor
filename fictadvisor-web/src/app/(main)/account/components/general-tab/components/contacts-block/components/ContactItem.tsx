import React, { FC } from 'react';
import { ContactResponse } from '@fictadvisor/utils/responses';
import { Box } from '@mui/material';
import { QueryObserverBaseResult } from '@tanstack/react-query';
import Link from 'next/link';

import * as styles from '@/app/(main)/account/components/general-tab/components/contacts-block/ContactsBlock.styles';
import Input from '@/components/common/ui/form/input-mui';
import { TrashBucketButton } from '@/components/common/ui/icon-button-mui/variants';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';
import UserAPI from '@/lib/api/user/UserAPI';

interface ContactProps extends ContactResponse {
  refetchContacts: QueryObserverBaseResult['refetch'];
}
const ContactItem: FC<ContactProps> = ({
  refetchContacts,
  id,
  link,
  name,
  displayName,
}) => {
  const { user: userNotNull } = useAuthentication();
  const user = userNotNull!;
  const handleDeleteClick = async () => {
    await UserAPI.deleteContact(user.id, id);
    await refetchContacts();
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
