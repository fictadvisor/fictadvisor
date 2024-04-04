'use client';
import React, { FC, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import DisciplineAPI from '@/lib/api/discipline/DisciplineAPI';
import AddDiscipline from '@/lib/api/discipline/types/AddDiscipline';
import { AdminDiscipline } from '@/types/discipline';

import DisciplinesInfoSection from './components/disciplines-info-section';
import * as styles from './EditDisciplinesAdminPage.styles';

interface EditDisciplinesAdminPageProps {
  discipline: AdminDiscipline;
}

const EditDisciplinesAdminPage: FC<EditDisciplinesAdminPageProps> = ({
  discipline,
}) => {
  const [body, setBody] = useState<AddDiscipline>({} as AddDiscipline);
  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (disciplineId: string) => {
    try {
      DisciplineAPI.deleteDiscipline(disciplineId);
      toast.success('Дисципліна успішно видалена!', '', 4000);
      router.push('/admin/disciplines');
    } catch (e) {
      displayError(e);
    }
  };

  const isValuesSet = () => {
    let isTeacherSet = true;
    if (body && body.teachers) {
      body.teachers.forEach(teacher => {
        if (!teacher.teacherId || !teacher.roleNames.length) {
          isTeacherSet = false;
        }
      });
    } else {
      isTeacherSet = false;
    }
    return isTeacherSet;
  };

  const handleEdit = (disciplineId: string) => {
    try {
      if (isValuesSet()) {
        DisciplineAPI.deleteDiscipline(disciplineId).then(() =>
          DisciplineAPI.addDiscipline(body as AddDiscipline),
        );
        toast.success('Дисципліна успішно змінена!', '', 4000);
        router.push('/admin/disciplines');
      } else {
        toast.error('Всі поля повинні бути заповнені!', '', 4000);
      }
    } catch (e) {
      displayError(e);
    }
  };

  return (
    <Box sx={{ p: '16px' }}>
      <Box sx={stylesAdmin.header}>
        <Box sx={stylesAdmin.editName}>
          <Typography variant="h5">Редагування</Typography>
          <Typography sx={stylesAdmin.name}>
            Дисципліна {discipline.subject.name}
          </Typography>
        </Box>
        <Stack flexDirection="row" gap="8px">
          <Button
            sx={styles.button}
            size={ButtonSize.MEDIUM}
            color={ButtonColor.SECONDARY}
            text="Скасувати"
            href="/admin/disciplines"
          />
          <Button
            sx={styles.button}
            size={ButtonSize.MEDIUM}
            variant={ButtonVariant.OUTLINE}
            color={ButtonColor.SECONDARY}
            startIcon={<TrashIcon />}
            text="Видалити"
            onClick={() => setIsOpen(true)}
          />
          {isOpen && (
            <DeletePopup
              setPopupOpen={setIsOpen}
              handleDeleteSubmit={() => handleDelete(discipline.id)}
              name={`дисципліну ${discipline.subject.name}`}
            />
          )}
          <Button
            sx={styles.button}
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            onClick={() => handleEdit(discipline.id)}
          />
        </Stack>
      </Box>
      <Stack flexDirection="column" gap="10px">
        <DisciplinesInfoSection discipline={discipline} setBody={setBody} />
      </Stack>
    </Box>
  );
};

export default EditDisciplinesAdminPage;
