import React, { FC } from 'react';

import { TrashBucketButton } from '@/components/common/ui/icon-button/variants';
import ImmutableInput from '@/components/common/ui/immutable-input';
import { Contact } from '@/components/pages/account-page/components/general-tab/components/contacts-block/types';
import useAuthentication from '@/hooks/use-authentication';
import { UserAPI } from '@/lib/api/user/UserAPI';

interface ContactProps extends Contact {
  refetchContacts;
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
    <>
      <ImmutableInput
        href={link}
        name={name}
        value={link}
        label={displayName}
      />
      <TrashBucketButton onClick={handleDeleteClick} />
    </>
  );
};

export default ContactItem;
