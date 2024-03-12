import React, { FC, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, CardHeader, Stack } from '@mui/material';
import { isAxiosError } from 'axios';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { InputSize, InputType } from '@/components/common/ui/form';
import Input from '@/components/common/ui/form/input-mui';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import SubjectAPI from '@/lib/api/subject/SubjectAPI';
import { Subject } from '@/types/subject';

import * as styles from './AdminSubjectEditPage.styles';
interface AdminSubjectEditPageProps {
  subject: Subject;
}
const AdminSubjectEditPage: FC<AdminSubjectEditPageProps> = ({ subject }) => {
  const [subjectName, setSubjectName] = useState<string>(subject.name);
  const toast = useToastError();
  const handleDelete = async (subjectId: string) => {
    try {
      await SubjectAPI.delete(subjectId);
    } catch (e) {
      if (isAxiosError(e)) {
        toast.displayError(e);
      }
    }
  };
  const handleEdit = async () => {
    try {
      await SubjectAPI.editSubject(subject.id, subjectName);
    } catch (e) {
      if (isAxiosError(e)) {
        toast.displayError(e);
      }
    }
  };
  return (
    <>
      <Box sx={styles.header}>
        <CardHeader
          title="Редагування"
          subheader={`Предмет ${subject.name.toLowerCase()}`}
          sx={styles.title}
        />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            color={ButtonColor.SECONDARY}
            text="Скасувати"
            href="/admin/subjects"
            sx={styles.button}
          />
          <Button
            size={ButtonSize.MEDIUM}
            variant={ButtonVariant.OUTLINE}
            color={ButtonColor.SECONDARY}
            startIcon={<TrashIcon />}
            text="Видалити"
            onClick={() => handleDelete(subject.id)}
            sx={styles.button}
          />
          <Button
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            onClick={() => handleEdit()}
            sx={styles.button}
          />
        </Stack>
      </Box>
      <Box sx={styles.input}>
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

export default AdminSubjectEditPage;
