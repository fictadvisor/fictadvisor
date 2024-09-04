import React, { FC, useState } from 'react';
import { ContactResponse } from '@fictadvisor/utils/responses';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Box, useMediaQuery } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ContactForm from '@/app/(main)/account/components/general-tab/components/contacts-block/components/ContactForm';
import ContactItem from '@/app/(main)/account/components/general-tab/components/contacts-block/components/ContactItem';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import useAuthentication from '@/hooks/use-authentication';
import UserAPI from '@/lib/api/user/UserAPI';
import theme from '@/styles/theme';

import * as styles from './ContactsBlock.styles';

const ContactsBlock: FC = () => {
  const qc = useQueryClient();

  const [isOpened, setIsOpened] = useState(false);
  const { user } = useAuthentication();
  const isMobile = useMediaQuery(theme.breakpoints.down('desktopSemiMedium'));

  const { data } = useQuery({
    queryKey: ['contacts', user.id],
    queryFn: () => UserAPI.getContacts(user.id),
    refetchOnWindowFocus: false,
  });
  const contacts = data?.contacts || [];
  const handleClick = () => setIsOpened(!isOpened);

  const refetch = async () => {
    await qc.refetchQueries({ queryKey: ['contacts', user.id] });
  };

  return (
    <>
      <Box sx={styles.contactItemContainer}>
        {contacts?.map((contact: ContactResponse, index) => (
          <ContactItem key={index} refetchContacts={refetch} {...contact} />
        ))}
      </Box>
      <Box sx={styles.confirmButton}>
        <Button
          text="Додати посилання"
          startIcon={<PlusIcon className={'icon'} />}
          size={isMobile ? ButtonSize.SMALL : ButtonSize.MEDIUM}
          variant={ButtonVariant.OUTLINE}
          type="submit"
          onClick={handleClick}
        />
      </Box>

      {isOpened && (
        <ContactForm
          refetchContacts={async () => {
            setIsOpened(false);
            await refetch();
          }}
        />
      )}
    </>
  );
};

export default ContactsBlock;
