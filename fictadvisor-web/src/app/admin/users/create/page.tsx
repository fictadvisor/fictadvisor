'use client';

import React, { useState } from 'react';
import { State } from '@fictadvisor/utils/enums';
import { Avatar, Box, CardHeader, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { UserStateOptions } from '@/app/admin/users/common/constants';
import * as styles from '@/app/admin/users/create/CreateUserAdminPage.styles';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
} from '@/components/common/ui/button-mui/types';
import { Dropdown, InputSize, InputType } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Input from '@/components/common/ui/form/input-mui';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import UserAPI from '@/lib/api/user/UserAPI';

const Create = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [userState, setUserState] = useState<State>('' as State);
  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();

  const handleUserCreation = async () => {
    try {
      await UserAPI.create({ username, email, state: userState });
      toast.success('Користувач успішно створений!', '', 4000);
      router.replace('/admin/users');
    } catch (e) {
      displayError(e);
    }
  };

  return (
    <Box sx={{ padding: '16px' }}>
      <Box sx={stylesAdmin.header}>
        <CardHeader title="Створення користувача" sx={stylesAdmin.title} />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            text="Скасувати"
            color={ButtonColor.SECONDARY}
            href="/admin/users"
            sx={stylesAdmin.button}
          />
          <Button
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            onClick={handleUserCreation}
            sx={stylesAdmin.button}
          />
        </Stack>
      </Box>
      <Box sx={styles.body}>
        <Box sx={stylesAdmin.inputsWrapper}>
          <Input
            value={username}
            onChange={setUsername}
            size={InputSize.MEDIUM}
            type={InputType.DEFAULT}
            showRemark={false}
            label="Username"
          />
          <Input
            value={email}
            onChange={setEmail}
            size={InputSize.MEDIUM}
            type={InputType.DEFAULT}
            showRemark={false}
            label="Пошта"
          />
          <Dropdown
            disableClearable
            placeholder="Стан користувача"
            size={FieldSize.MEDIUM}
            options={UserStateOptions}
            showRemark={false}
            onChange={(value: string) => setUserState(value as State)}
            value={userState}
            label="Стан користувача"
          />
        </Box>
        <Box>
          <Avatar
            src="/frog-avatar.png"
            alt="картинка користувача"
            sx={styles.avatar}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Create;
