'use client';
import { FC, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
} from '@/components/common/ui/button-mui/types';
import useToast from '@/hooks/use-toast';
import QuestionAPI from '@/lib/api/questions/QuestionAPI';

import { AdminQuestion } from '../../types';
import QuestionInfo from '../components/question-info';

import * as styles from './QuestionsCreatePage.styles';

const QuestionsAdminCreatePage: FC = () => {
  const [body, setBody] = useState<AdminQuestion>();
  const toast = useToast();
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
      if (isAxiosError(error)) {
        toast.error(error.response?.data.messages[0], '', 4000);
      }
    }
  };

  return (
    <Box sx={{ p: '16px' }}>
      <Box sx={styles.header}>
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

export default QuestionsAdminCreatePage;
