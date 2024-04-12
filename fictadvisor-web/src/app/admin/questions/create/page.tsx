'use client';

import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import QuestionInfo from '@/app/admin/questions/common/components/question-info';
import { AdminQuestion } from '@/app/admin/questions/common/types';
import * as styles from '@/app/admin/questions/create/CreateQuestionsAdminPage.styles';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
} from '@/components/common/ui/button-mui/types';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import QuestionAPI from '@/lib/api/questions/QuestionAPI';

const Page = () => {
  const [body, setBody] = useState<AdminQuestion>();
  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();

  const handleChanges = (values: AdminQuestion) => {
    setBody(prevValues => {
      if (JSON.stringify(values) !== JSON.stringify(prevValues)) {
        return values;
      }
      return prevValues;
    });
  };

  const addQuestion = async () => {
    try {
      await QuestionAPI.addQuestion(body as AdminQuestion);
      toast.success('Питання успішно додано', '', 4000);
      router.push('/admin/questions');
    } catch (error) {
      displayError(error);
    }
  };

  return (
    <Box sx={{ p: '16px' }}>
      <Box sx={stylesAdmin.header}>
        <Box sx={styles.createName}>
          <Typography variant="h5">Створення питання</Typography>
        </Box>
        <Stack flexDirection="row" gap="12px">
          <Button
            sx={styles.button}
            size={ButtonSize.MEDIUM}
            color={ButtonColor.SECONDARY}
            text="Скасувати"
            href="/admin/questions"
          />
          <Button
            type="submit"
            sx={styles.button}
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            disabled={body == undefined}
            onClick={() => addQuestion()}
          />
        </Stack>
      </Box>
      <QuestionInfo handleChanges={handleChanges} />
    </Box>
  );
};

export default Page;
