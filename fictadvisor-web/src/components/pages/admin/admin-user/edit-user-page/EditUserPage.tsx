'use client';
import React, { FC, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Avatar, Box, CardHeader, Stack } from '@mui/material';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import { Dropdown, InputSize, InputType } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Input from '@/components/common/ui/form/input-mui';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import UserAPI from '@/lib/api/user/UserAPI';
import { UserAdmin, UserGroupState } from '@/types/user';

import { UserStateOptions } from '../constants/UserStateOptions';

import * as styles from './EditUserPage.styles';
interface EditUserPageProps {
  user: UserAdmin;
}
const EditUserPage: FC<EditUserPageProps> = ({ user }) => {
  const [username, setUsername] = useState<string>(user.username);
  const [email, setEmail] = useState<string>(user.email);
  const [userState, setUserState] = useState<UserGroupState>(user.state);
  const toast = useToast();
  const toastError = useToastError();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (userId: string) => {
    try {
      await UserAPI.delete(userId);
      toast.success('Користувач успішно видалений!', '', 4000);
      router.replace('/admin/users');
    } catch (e) {
      if (isAxiosError(e)) {
        toastError.displayError(e);
      }
    }
  };
  const handleEdit = async () => {
    try {
      await UserAPI.editUser(user.id, {
        username,
        email,
        state: userState,
      });
      toast.success('Користувач успішно змінений!', '', 4000);
    } catch (e) {
      if (isAxiosError(e)) {
        toastError.displayError(e);
      }
    }
  };
  return (
    <>
      <Box sx={styles.header}>
        <CardHeader
          title="Редагування"
          subheader={`Користувач ${user.username}`}
          sx={styles.title}
        />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            color={ButtonColor.SECONDARY}
            text="Скасувати"
            href="/admin/users"
            sx={styles.button}
          />
          <Button
            size={ButtonSize.MEDIUM}
            variant={ButtonVariant.OUTLINE}
            color={ButtonColor.SECONDARY}
            startIcon={<TrashIcon />}
            text="Видалити"
            onClick={() => setIsOpen(true)}
            sx={styles.button}
          />
          {isOpen && (
            <DeletePopup
              setPopupOpen={setIsOpen}
              handleDeleteSubmit={() => handleDelete(user.id)}
              name={`користувача ${user.username}`}
            />
          )}
          <Button
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            onClick={() => {
              handleEdit();
            }}
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
            placeholder="Сортувати користувачів"
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
            src={user.avatar}
            alt="картинка користувача"
            sx={styles.avatar}
          />
        </Box>
      </Box>
    </>
  );
};

export default EditUserPage;
