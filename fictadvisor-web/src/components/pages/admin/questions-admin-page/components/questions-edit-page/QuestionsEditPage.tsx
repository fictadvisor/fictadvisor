'use client';
import { FC, useState } from 'react';
import { useQuery } from 'react-query';
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
import QuestionAPI from '@/lib/api/questions/QuestionAPI';

import { AdminQuestion } from '../../types';
import QuestionInfo from '../components/question-info';

import * as styles from './QuestionsEditPage.styles';

interface QuestionsAdminEditPageProps {
  questionId: string;
}

const QuestionsAdminEditPage: FC<QuestionsAdminEditPageProps> = ({
  questionId,
}) => {
  const { data } = useQuery('question', () =>
    QuestionAPI.getQuestion(questionId),
  );

  const [body, setBody] = useState<AdminQuestion>();
  const toast = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleChanges = (values: AdminQuestion) => {
    setBody(prevValues => {
      if (JSON.stringify(values) !== JSON.stringify(prevValues)) {
        return values;
      }
      return prevValues;
    });
  };

  const deleteQuestion = async (id: string) => {
    try {
      await QuestionAPI.deleteQuestion(id);
      toast.success('Питання успішно видалено', '', 4000);
      router.push('/admin/questions');
    } catch (e) {
      if (isAxiosError(e)) {
        toast.error(e.response?.data.messages[0]);
      }
    }
  };

  const updateQuestion = async () => {
    try {
      await QuestionAPI.updateQuestion(
        data?.id as string,
        body as AdminQuestion,
      );
      toast.success('Питання успішно оновлено', '', 4000);
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
        <Box sx={styles.editName}>
          <Typography variant="h5">Редагування</Typography>
          <Typography sx={styles.name}>{data?.text}</Typography>
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
              handleDeleteSubmit={() => deleteQuestion(data?.id as string)}
              name={`питання ${data?.name}`}
            />
          )}
          <Button
            type="submit"
            sx={styles.button}
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            onClick={() => updateQuestion()}
          />
        </Stack>
      </Box>
      <QuestionInfo question={data} handleChanges={handleChanges} />
    </Box>
  );
};

export default QuestionsAdminEditPage;
