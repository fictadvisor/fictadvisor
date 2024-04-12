'use client';

import React, { FC, useState } from 'react';
import { Box, CardHeader, Stack, Switch, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import * as styles from '@/app/admin/roles/[roleId]/grants/create/CreateGrantsAdminPage.styles';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
} from '@/components/common/ui/button-mui/types';
import { InputSize, InputType } from '@/components/common/ui/form';
import Input from '@/components/common/ui/form/input-mui';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GrantsAPI from '@/lib/api/grants/GrantsAPI';

interface AdminGrantsCreatePageProps {
  params: {
    roleId: string;
    grantId: string;
  };
}

const AdminGrantsCreatePage: FC<AdminGrantsCreatePageProps> = ({ params }) => {
  const [permission, setPermission] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [set, setSet] = useState<boolean>(false);
  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();

  const handleUserCreation = async () => {
    try {
      await GrantsAPI.create(params.roleId, {
        permission,
        weight: +weight,
        set,
      });
      toast.success('Право успішно створено!', '', 4000);
      router.replace(`/admin/roles/${params.roleId}/grants`);
    } catch (e) {
      displayError(e);
    }
  };

  return (
    <>
      <Box sx={stylesAdmin.header}>
        <CardHeader title="Створення права" sx={stylesAdmin.title} />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            text="Скасувати"
            color={ButtonColor.SECONDARY}
            href={`/admin/roles/${params.roleId}/grants`}
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
            value={permission}
            onChange={setPermission}
            size={InputSize.MEDIUM}
            type={InputType.DEFAULT}
            showRemark={false}
            label="Право"
            placeholder="Право"
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
          <Box sx={styles.switchWrapper}>
            <Typography variant="body1" color="grey.800">
              Дійсність права
            </Typography>
            <Switch
              sx={styles.switchStyle}
              checked={set}
              onChange={(_e, value) => setSet(value)}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AdminGrantsCreatePage;
