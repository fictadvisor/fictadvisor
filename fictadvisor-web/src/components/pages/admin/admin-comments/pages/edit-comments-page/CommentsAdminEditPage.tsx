'use client';
import React, { FC, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, CardHeader, Stack } from '@mui/material';
import { isAxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import TextArea from '@/components/common/ui/form/text-area-mui';
import { createValidationSchema } from '@/components/pages/admin/admin-comments/pages/edit-comments-page/types/validation';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import { DeleteCommentBody } from '@/lib/api/teacher/types/DeleteCommentBody';
import { Comment } from '@/lib/api/teacher/types/GetCommentsWithPaginationResponse';
import getErrorMessage from '@/lib/utils/getErrorMessage';

import * as styles from './CommentsAdminEditPage.styles';

interface CommentsAdminEditPageProps {
  comment: Comment;
}

const CommentsAdminEditPage: FC<CommentsAdminEditPageProps> = ({ comment }) => {
  const [answer, setAnswer] = useState<string>(comment.comment);
  const toast = useToast();
  const toastError = useToastError();
  const router = useRouter();

  const handleDelete = async (
    data: DeleteCommentBody,
    disciplineTeacherId: string,
  ) => {
    try {
      await TeacherAPI.deleteComment(data, disciplineTeacherId);
      toast.success('Відгук успішно видалений!', '', 4000);
      router.replace('/admin/comments');
    } catch (e) {
      if (isAxiosError(e)) {
        toastError.displayError(e.response?.data.message);
      }
    }
  };

  const handleEdit = async () => {
    try {
      await TeacherAPI.updateComment(
        {
          userId: comment.userId,
          questionId: comment.questionId,
          comment: answer,
        },
        comment.disciplineTeacherId,
      );
      toast.success('Відгук успішно змінений!', '', 4000);
      router.replace('/admin/comments');
    } catch (e) {
      const message = getErrorMessage(e);
      let errorMessage = 'Щось пішло не так, спробуй пізніше!';

      if (message.includes('min')) {
        errorMessage = 'Текст повинен містити не менше 4 символів';
      }

      toast.error('Помилка!', errorMessage);
    }
  };

  return (
    <Formik
      validationSchema={createValidationSchema()}
      validateOnMount
      validateOnChange
      initialValues={{ answer: comment.comment }}
      onSubmit={handleEdit}
    >
      {() => (
        <Form>
          <Box sx={styles.header}>
            <CardHeader
              title="Редагування"
              subheader={comment.comment}
              sx={styles.title}
            />
            <Stack flexDirection="row" gap="8px">
              <Button
                size={ButtonSize.MEDIUM}
                color={ButtonColor.SECONDARY}
                text="Скасувати"
                href="/admin/comments"
                sx={styles.button}
              />
              <Button
                size={ButtonSize.MEDIUM}
                variant={ButtonVariant.OUTLINE}
                color={ButtonColor.SECONDARY}
                startIcon={<TrashIcon />}
                text="Видалити"
                onClick={() =>
                  handleDelete(comment, comment.disciplineTeacherId)
                }
                sx={styles.button}
              />
              <Button
                size={ButtonSize.MEDIUM}
                text="Зберегти"
                sx={styles.button}
                type="submit"
              />
            </Stack>
          </Box>
          <Box sx={styles.body}>
            <Box sx={styles.textArea}>
              <TextArea
                value={answer}
                onChange={value => setAnswer(value)}
                label="Відгук"
              />
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CommentsAdminEditPage;
