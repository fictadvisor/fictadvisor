'use client';

import React, { useState } from 'react';
import { RoleName } from '@fictadvisor/utils/enums';
import { Box, CardHeader, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { RoleNameOptions } from '@/app/admin/roles/common/constants';
import * as styles from '@/app/admin/roles/create/CreateRolesAdminPage.styles';
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
import RoleAPI from '@/lib/api/role/RoleAPI';

const Create = () => {
  const [displayName, setDisplayName] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [name, setName] = useState<RoleName>('' as RoleName);
  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();

  const handleUserCreation = async () => {
    try {
      await RoleAPI.create({ name, weight: parseInt(weight), displayName });
      toast.success('Роль успішно створена!', '', 4000);
      router.replace('/admin/roles');
    } catch (e) {
      displayError(e);
    }
  };

  return (
    <>
      <Box sx={stylesAdmin.header}>
        <CardHeader title="Створення ролі" sx={stylesAdmin.title} />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            text="Скасувати"
            color={ButtonColor.SECONDARY}
            href="/admin/roles"
            sx={stylesAdmin.button}
          />
          <Button
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            onClick={() => handleUserCreation()}
            sx={stylesAdmin.button}
          />
        </Stack>
      </Box>
      <Box sx={styles.body}>
        <Box sx={stylesAdmin.inputsWrapper}>
          <Input
            value={displayName}
            onChange={setDisplayName}
            size={InputSize.MEDIUM}
            type={InputType.DEFAULT}
            showRemark={false}
            label="Відображуване ім’я"
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
          />
        </Box>
      </Box>
    </>
  );
};

export default Create;
