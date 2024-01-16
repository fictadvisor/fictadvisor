'use client';
import React, { FC, useState } from 'react';
import { Box, CardHeader, Stack, Switch, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

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

import * as styles from './AdminGrantsCreate.styles';

const AdminGrantsCreate: FC<{ roleId: string }> = ({ roleId }) => {
  const [permission, setPermission] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [set, setSet] = useState<boolean>(false);
  const toast = useToast();
  const toastError = useToastError();
  const router = useRouter();

  const handleUserCreation = async () => {
    try {
      await GrantsAPI.create(roleId, { permission, weight: +weight, set });
      toast.success('Право успішно створено!', '', 4000);
      router.replace(`/admin/roles/${roleId}/grants`);
    } catch (e) {
      if (isAxiosError(e)) {
        toastError.displayError(e);
      }
    }
  };

  return (
    <>
      <Box sx={styles.header}>
        <CardHeader title="Створення права" sx={styles.title} />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            text="Скасувати"
            color={ButtonColor.SECONDARY}
            href={`/admin/roles/${roleId}/grants`}
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

export default AdminGrantsCreate;
