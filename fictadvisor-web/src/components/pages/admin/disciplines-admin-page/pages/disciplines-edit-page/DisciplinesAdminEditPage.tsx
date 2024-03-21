'use client';
import React, { FC, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, Stack, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import DisciplineAPI from '@/lib/api/discipline/DisciplineAPI';
import AddDiscipline from '@/lib/api/discipline/types/AddDiscipline';
import { AdminDiscipline } from '@/types/discipline';

import DisciplinesInfoSection from './components/disciplines-info-section';
import * as styles from './DisciplinesAdminPage.styles';

interface DisciplinesAdminEditPageProps {
  discipline: AdminDiscipline;
}

const DisciplinesEditPage: FC<DisciplinesAdminEditPageProps> = ({
  discipline,
}) => {
  const [body, setBody] = useState<AddDiscipline>();
  const toast = useToast();
  const toastError = useToastError();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (disciplineId: string) => {
    try {
      DisciplineAPI.deleteDiscipline(disciplineId);
      toast.success('Користувач успішно видалений!', '', 4000);
      router.push('/admin/disciplines');
    } catch (e) {
      if (isAxiosError(e)) {
        toastError.displayError(e);
      }
    }
  };

  const onEditSubmit = (values: AddDiscipline) => {
    setBody(prevValues => {
      if (JSON.stringify(values) !== JSON.stringify(prevValues)) {
        return values;
      }
      return prevValues;
    });
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
        toast.success('Користувач успішно змінений!', '', 4000);
        router.push('/admin/disciplines');
      } else {
        toast.error('Всі поля повинні бути заповнені!', '', 4000);
      }
    } catch (e) {
      if (isAxiosError(e)) {
        toastError.displayError(e);
      }
    }
  };

  return (
    <Box sx={{ p: '16px' }}>
      <Box sx={styles.header}>
        <Box sx={styles.editName}>
          <Typography variant="h5">Редагування</Typography>
          <Typography sx={styles.name}>Дисципліна {discipline.name}</Typography>
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
              name={`дисципліну ${discipline.name}`}
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
      {discipline && (
        <Stack flexDirection="column" gap="10px">
          <DisciplinesInfoSection
            discipline={discipline}
            onEditSubmit={onEditSubmit}
          />
        </Stack>
      )}
    </Box>
  );
};

export default DisciplinesEditPage;
