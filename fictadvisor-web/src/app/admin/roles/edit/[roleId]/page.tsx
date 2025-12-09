'use client';
import React, { FC, use, useCallback, useEffect, useState } from 'react';
import { RoleName } from '@fictadvisor/utils/enums';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, CardHeader, Link, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { RoleNameOptions } from '@/app/admin/roles/common/constants';
import * as styles from '@/app/admin/roles/edit/[roleId]/EditRolesAdminPage.styles';
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
import LoadPage from '@/components/common/ui/load-page/LoadPage';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import RoleAPI from '@/lib/api/role/RoleAPI';

interface AdminRolesEditProps {
  params: Promise<{
    roleId: string;
  }>;
}

const AdminRolesEdit: FC<AdminRolesEditProps> = ({ params }) => {
  const { roleId } = use(params);

  const {
    data: role,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['getRole', roleId],
    queryFn: () => RoleAPI.getById(roleId),
    ...useQueryAdminOptions,
  });

  const [displayName, setDisplayName] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [name, setName] = useState<RoleName>();
  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!role) return;

    setDisplayName(role.displayName);
    setWeight(role.weight.toString());
    setName(role.name);
  }, [role]);

  const handleDelete = async (userId: string) => {
    try {
      await RoleAPI.delete(userId);
      toast.success('Роль успішно видалена!', '', 4000);
      router.replace('/admin/roles');
    } catch (e) {
      displayError(e);
    }
  };

  const handleEdit = useCallback(async () => {
    if (!role || !weight) return;

    try {
      await RoleAPI.edit(role.id, {
        displayName,
        weight: parseInt(weight),
        name,
      });
      toast.success('Роль успішно змінена!', '', 4000);
      router.replace('/admin/roles');
    } catch (e) {
      displayError(e);
    }
  }, [role, weight, displayName, name]);

  if (isLoading) return <LoadPage />;

  if (error) {
    displayError(error);
    throw new Error(
      `An error has occurred while editing ${roleId} role`,
    );
  }

  return (
    <>
      <Box sx={stylesAdmin.header}>
        <CardHeader
          title="Редагування"
          subheader={role?.id}
          sx={stylesAdmin.title}
        />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            color={ButtonColor.SECONDARY}
            text="Скасувати"
            href="/admin/roles"
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
              handleDeleteSubmit={() => handleDelete(role?.id ?? '')}
              name={`роль ${role?.displayName}`}
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
            value={displayName ?? ''}
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
            value={name ?? ''}
            label="Тип ролі"
          />
          <Input
            value={weight ?? ''}
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
            href={`/admin/roles/${role?.id}/grants`}
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

export default AdminRolesEdit;
