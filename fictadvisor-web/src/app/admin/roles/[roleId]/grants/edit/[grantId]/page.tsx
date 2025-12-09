'use client';
import React, { FC, use, useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, CardHeader, Stack, Switch, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import * as styles from '@/app/admin/roles/[roleId]/grants/edit/[grantId]/EditGrantsAdminPage.styles';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import { InputSize, InputType } from '@/components/common/ui/form';
import Input from '@/components/common/ui/form/input-mui';
import LoadPage from '@/components/common/ui/load-page/LoadPage';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GrantsAPI from '@/lib/api/grants/GrantsAPI';

interface AdminGrantsEditProps {
  params: Promise<{
    roleId: string;
    grantId: string;
  }>;
}

const AdminGrantsEdit: FC<AdminGrantsEditProps> = ({ params }) => {
  const { roleId, grantId } = use(params);

  const { displayError } = useToastError();
  const [permission, setPermission] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [set, setSet] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);

  const toast = useToast();
  const router = useRouter();

  const {
    data: grant,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['getGrantById', roleId, grantId],
    queryFn: () => GrantsAPI.getByGrantId(roleId, grantId),
    ...useQueryAdminOptions,
  });

  useEffect(() => {
    if (!grant) return;

    setPermission(grant.permission);
    setWeight(grant.weight.toString());
    setSet(grant.set);
  }, [grant]);

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
    if (!grant) return;

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

  if (isLoading) return <LoadPage />;

  if (error) {
    displayError(error);
    throw new Error(
      `An error has occurred while editing ${grantId} grant`,
    );
  }

  return (
    <>
      <Box sx={stylesAdmin.header}>
        <CardHeader
          title="Редагування"
          subheader={`Права ${grant?.permission}`}
          sx={stylesAdmin.title}
        />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            color={ButtonColor.SECONDARY}
            text="Скасувати"
            href={`/admin/roles/${roleId}/grants`}
            sx={stylesAdmin.button}
          />
          <Button
            size={ButtonSize.MEDIUM}
            variant={ButtonVariant.OUTLINE}
            color={ButtonColor.SECONDARY}
            startIcon={<TrashIcon />}
            text="Видалити"
            onClick={() => setIsOpen(true)}
            sx={stylesAdmin.button}
          />
          {isOpen && (
            <DeletePopup
              setPopupOpen={setIsOpen}
              handleDeleteSubmit={() => handleDelete(grant?.id ?? '')}
              name={`Право ${grant?.permission}`}
            />
          )}
          <Button
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            onClick={handleEdit}
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

export default AdminGrantsEdit;
