'use client';
import React, { FC, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, CardHeader, Link, Stack } from '@mui/material';
import { isAxiosError } from 'axios';
import NextLink from 'next/link';
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
import RoleAPI from '@/lib/api/role/RoleAPI';
import { Role, RoleName } from '@/types/role';

import { RoleNameOptions } from '../common/constants/Options';

import * as styles from './EditRolesPage.styles';
interface EditRolesPageProps {
  role: Role;
}
const EditRolesPage: FC<EditRolesPageProps> = ({ role }) => {
  const [displayName, setDisplayName] = useState<string>(role.displayName);
  const [weight, setWeight] = useState<string>(role.weight.toString());
  const [name, setName] = useState<RoleName>(role.name);
  const toast = useToast();
  const toastError = useToastError();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (userId: string) => {
    try {
      await RoleAPI.delete(userId);
      toast.success('Роль успішно видалена!', '', 4000);
      router.replace('/admin/roles');
    } catch (e) {
      if (isAxiosError(e)) {
        toastError.displayError(e);
      }
    }
  };
  const handleEdit = async () => {
    try {
      await RoleAPI.edit(
        {
          displayName,
          weight: parseInt(weight),
          name,
        },
        role.id,
      );
      toast.success('Роль успішно змінена!', '', 4000);
    } catch (e) {
      if (isAxiosError(e)) {
        toastError.displayError(e);
      }
    }
  };
  return (
    <>
      <Box sx={styles.header}>
        <CardHeader title="Редагування" subheader={role.id} sx={styles.title} />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            color={ButtonColor.SECONDARY}
            text="Скасувати"
            href="/admin/roles"
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
              handleDeleteSubmit={() => handleDelete(role.id)}
              name={`роль ${role.displayName}`}
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
            value={displayName}
            onChange={setDisplayName}
            size={InputSize.MEDIUM}
            type={InputType.DEFAULT}
            showRemark={false}
            label="Відображуване ім’я"
            placeholder="Відображуване ім’я"
          />
          <Dropdown
            disableClearable
            placeholder="Тип ролі"
            size={FieldSize.MEDIUM}
            options={RoleNameOptions}
            showRemark={false}
            onChange={(value: string) => setName(value as RoleName)}
            value={name}
            label="Тип ролі"
          />
          <Input
            value={weight}
            onChange={setWeight}
            size={InputSize.MEDIUM}
            type={InputType.DEFAULT}
            showRemark={false}
            label="Вага"
            placeholder="Вага"
          />
        </Box>
        <Box sx={{ maxWidth: '149px' }}>
          <Link
            href={`/admin/roles/${role.id}/grants`}
            component={NextLink}
            underline="none"
            color="inherit"
          >
            <Button
              size={ButtonSize.SMALL}
              variant={ButtonVariant.FILLED}
              text="Перейти до прав"
            />
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default EditRolesPage;
