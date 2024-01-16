'use client';
import React, { FC, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, CardHeader, Stack, Switch, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { InputSize, InputType } from '@/components/common/ui/form';
import Input from '@/components/common/ui/form/input-mui';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GrantsAPI from '@/lib/api/grants/GrantsAPI';
import { Grant } from '@/types/role';

import * as styles from './EditGrantsPage.styles';
interface EditGrantsPageProps {
  grant: Grant;
  roleId: string;
}

const EditGrantsPage: FC<EditGrantsPageProps> = ({ grant, roleId }) => {
  const [permission, setPermission] = useState<string>(grant.permission);
  const [weight, setWeight] = useState<string>(grant.weight.toString());
  const [set, setSet] = useState<boolean>(grant.set);
  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();

  const handleDelete = async (grantId: string) => {
    try {
      await GrantsAPI.delete(roleId, grantId);
      toast.success('Роль успішно видалена!', '', 4000);
      router.replace(`/admin/roles/${roleId}/grants`);
    } catch (e) {
      displayError(e);
    }
  };
  const handleEdit = async () => {
    try {
      await GrantsAPI.edit(roleId, grant.id, {
        permission: permission,
        weight: +weight,
        set,
      });
      toast.success('Право успішно змінено!', '', 4000);
      router.replace(`/admin/roles/${roleId}/grants`);
    } catch (e) {
      displayError(e);
    }
  };

  return (
    <>
      <Box sx={styles.header}>
        <CardHeader
          title="Редагування"
          subheader={`Права ${grant.permission}`}
          sx={styles.title}
        />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            color={ButtonColor.SECONDARY}
            text="Скасувати"
            href={`/admin/roles/${roleId}/grants`}
            sx={styles.button}
          />
          <Button
            size={ButtonSize.MEDIUM}
            variant={ButtonVariant.OUTLINE}
            color={ButtonColor.SECONDARY}
            startIcon={<TrashIcon />}
            text="Видалити"
            onClick={() => handleDelete(grant.id)}
            sx={styles.button}
          />
          <Button
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            onClick={handleEdit}
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

export default EditGrantsPage;
