'use client';
import React, { FC, useState } from 'react';
import { Avatar, Box, CardHeader, Stack } from '@mui/material';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

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
import { UserGroupState } from '@/types/user';

import { UserStateOptions } from '../constants/UserStateOptions';

import * as styles from './AdminUserCreate.styles';

const AdminUserCreate: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [userState, setUserState] = useState<UserGroupState>(
    '' as UserGroupState,
  );
  const toast = useToast();
  const toastError = useToastError();
  const router = useRouter();

  const handleUserCreation = async () => {
    try {
      await UserAPI.create({ username, email, state: userState });
      toast.success('Користувач успішно створений!', '', 4000);
      router.replace('/admin/users');
    } catch (e) {
      if (isAxiosError(e)) {
        toastError.displayError(e);
      }
    }
  };

  return (
    <>
      <Box sx={styles.header}>
        <CardHeader title="Створення користувача" sx={styles.title} />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            text="Скасувати"
            color={ButtonColor.SECONDARY}
            href="/admin/users"
            sx={styles.button}
          />
          <Button
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            onClick={() => handleUserCreation()}
            sx={styles.button}
          />
        </Stack>
      </Box>
      <Box sx={styles.body}>
        <Box sx={styles.inputsWrapper}>
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
            onChange={(value: string) => setUserState(value as UserGroupState)}
            value={userState}
            label="Стан користувача"
          />
        </Box>
        <Box>
          <Avatar
            src={'/frog-avatar.png'}
            alt="картинка користувача"
            sx={styles.avatar}
          />
        </Box>
      </Box>
    </>
  );
};

export default AdminUserCreate;
