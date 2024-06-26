'use client';
import React from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

import ChangePasswordForm from '@/app/(main)/account/components/security-tab/components/change-password-form';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import Input from '@/components/common/ui/form/input-mui';
import useAuthentication from '@/hooks/use-authentication';
import AuthService from '@/lib/services/auth';

import * as styles from './SecurityTab.styles';

const SecurityTab = () => {
  const { replace } = useRouter();
  const { user, update } = useAuthentication();
  const handleLogout = async () => {
    await AuthService.logout();
    update();
    window.location.reload();
    await replace('/login');
  };
  return (
    <Box sx={styles.wrapper}>
      <Box>
        <Divider text={'Зміна пароля'} textAlign={DividerTextAlign.LEFT} />
        <ChangePasswordForm />
      </Box>
      <Divider
        sx={styles.divider}
        text={'Юзернейм і пошта'}
        textAlign={DividerTextAlign.LEFT}
      />
      <Box sx={styles.userInformation}>
        <Input
          readOnly
          onChange={() => {}}
          label="Юзернейм"
          value={user.username}
        />
        <Input readOnly onChange={() => {}} label="Пошта" value={user.email} />
      </Box>
      <Divider sx={styles.divider} />
      <Button
        sx={styles.exitButton}
        text={'Вийти з акаунту'}
        variant={ButtonVariant.FILLED}
        color={ButtonColor.SECONDARY}
        size={ButtonSize.MEDIUM}
        onClick={handleLogout}
      />
    </Box>
  );
};

export default SecurityTab;
