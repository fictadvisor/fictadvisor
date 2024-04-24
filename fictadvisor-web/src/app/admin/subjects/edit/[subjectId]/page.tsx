'use client';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, CardHeader, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
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
import SubjectAPI from '@/lib/api/subject/SubjectAPI';

interface AdminSubjectEditProps {
  params: {
    subjectId: string;
  };
}
const AdminSubjectEdit: FC<AdminSubjectEditProps> = ({ params }) => {
  const {
    data: subject,
    isSuccess,
    isLoading,
  } = useQuery(
    ['subject', params.subjectId],
    () => SubjectAPI.getSubject(params.subjectId),
    useQueryAdminOptions,
  );

  if (!isSuccess)
    throw new Error(`An error has occurred while fetching subjects`);

  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();

  const [subjectName, setSubjectName] = useState<string>(subject.name);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (subjectId: string) => {
    try {
      await SubjectAPI.delete(subjectId);
      toast.success('Предмет успішно видалено!', '', 4000);
      router.replace('/admin/subjects');
    } catch (e) {
      displayError(e);
    }
  };
  const handleEdit = async () => {
    try {
      await SubjectAPI.editSubject(subject.id, subjectName);
      toast.success('Предмет успішно змінений!', '', 4000);
      router.replace('/admin/subjects');
    } catch (e) {
      displayError(e);
    }
  };

  if (isLoading) return <LoadPage />;

  return (
    <>
      <Box sx={stylesAdmin.header}>
        <CardHeader
          title="Редагування"
          subheader={`Предмет ${subject.name.toLowerCase()}`}
          sx={stylesAdmin.title}
        />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            color={ButtonColor.SECONDARY}
            text="Скасувати"
            href="/admin/subjects"
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
              handleDeleteSubmit={() => handleDelete(subject.id)}
              name={`предмет ${subject.name}`}
            />
          )}
          <Button
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            onClick={() => handleEdit()}
            sx={stylesAdmin.button}
          />
        </Stack>
      </Box>
      <Box sx={stylesAdmin.input}>
        <Input
          value={subjectName}
          onChange={setSubjectName}
          size={InputSize.MEDIUM}
          type={InputType.DEFAULT}
          showRemark={false}
          label="Предмет"
        />
      </Box>
    </>
  );
};

export default AdminSubjectEdit;
