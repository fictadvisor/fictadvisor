'use client';

import React, { FC, useCallback, useState } from 'react';
import { UpdateQuestionDTO } from '@fictadvisor/utils/requests';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import QuestionInfo from '@/app/admin/questions/common/components/question-info';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import LoadPage from '@/components/common/ui/load-page';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import QuestionAPI from '@/lib/api/questions/QuestionAPI';

interface PageProps {
  params: {
    questionId: string;
  };
}

const Edit: FC<PageProps> = ({ params }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['question', params.questionId],
    queryFn: () => QuestionAPI.getQuestion(params.questionId),
    ...useQueryAdminOptions,
  });

  const [body, setBody] = useState<UpdateQuestionDTO>({});
  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleChanges = (values: UpdateQuestionDTO) => {
    setBody(prevValues =>
      JSON.stringify(values) !== JSON.stringify(prevValues)
        ? values
        : prevValues,
    );
  };

  const deleteQuestion = async (id: string) => {
    try {
      await QuestionAPI.deleteQuestion(id);
      toast.success('Питання успішно видалено', '', 4000);
      router.push('/admin/questions');
    } catch (e) {
      displayError(e);
    }
  };

  const updateQuestion = useCallback(async () => {
    if (!data) return;

    try {
      await QuestionAPI.updateQuestion(data.id, body);
      toast.success('Питання успішно оновлено', '', 4000);
      router.push('/admin/questions');
    } catch (error) {
      displayError(error);
    }
  }, [data, body]);

  if (isLoading) return <LoadPage />;

  if (!data) throw new Error('Something went wrong in');

  return (
    <Box sx={{ p: '16px' }}>
      <Box sx={stylesAdmin.header}>
        <Box sx={stylesAdmin.editName}>
          <Typography variant="h5">Редагування</Typography>
          <Typography sx={stylesAdmin.name}>{data?.text}</Typography>
        </Box>
        <Stack flexDirection="row" gap="12px">
          <Button
            sx={stylesAdmin.button}
            size={ButtonSize.MEDIUM}
            color={ButtonColor.SECONDARY}
            text="Скасувати"
            href="/admin/questions"
          />
          <Button
            sx={stylesAdmin.button}
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
              handleDeleteSubmit={() => deleteQuestion(data.id as string)}
              name={`питання ${data.name}`}
            />
          )}
          <Button
            type="submit"
            sx={stylesAdmin.button}
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

export default Edit;
