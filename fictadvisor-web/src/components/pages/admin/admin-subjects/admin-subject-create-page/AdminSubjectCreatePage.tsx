import React, { FC, useState } from 'react';
import { Box, CardHeader, Stack } from '@mui/material';
import { isAxiosError } from 'axios';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
} from '@/components/common/ui/button-mui/types';
import { InputSize, InputType } from '@/components/common/ui/form';
import Input from '@/components/common/ui/form/input-mui';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import SubjectAPI from '@/lib/api/subject/SubjectAPI';

import * as styles from './AdminSubjectCreatePage.styles';

const AdminSubjectCreatePage: FC = () => {
  const toast = useToastError();
  const [subject, setSubject] = useState<string>('');
  const handleSubjectCreation = async () => {
    try {
      await SubjectAPI.createSubject(subject);
    } catch (e) {
      if (isAxiosError(e)) {
        toast.displayError(e.response?.data.message);
      }
    }
  };
  return (
    <>
      <Box sx={styles.header}>
        <CardHeader title="Створення предмету" sx={styles.title} />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            text="Скасувати"
            color={ButtonColor.SECONDARY}
            href="/admin/subjects"
            sx={styles.button}
          />
          <Button
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            onClick={() => handleSubjectCreation()}
            sx={styles.button}
          />
        </Stack>
      </Box>
      <Input
        value={subject}
        onChange={setSubject}
        size={InputSize.MEDIUM}
        type={InputType.DEFAULT}
        placeholder="Предмет"
        showRemark={false}
        sx={styles.input}
      />
    </>
  );
};

export default AdminSubjectCreatePage;
