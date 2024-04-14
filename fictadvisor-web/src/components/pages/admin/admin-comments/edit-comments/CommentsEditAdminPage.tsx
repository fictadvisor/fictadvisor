'use client';
import React, { FC, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, CardHeader, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import TextArea from '@/components/common/ui/form/text-area-mui';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import { DeleteCommentBody } from '@/lib/api/teacher/types/DeleteCommentBody';
import { Comment } from '@/lib/api/teacher/types/GetCommentsWithPaginationResponse';

import { createValidationSchema } from '../common/types';

import * as styles from './CommentsEditAdminPage.styles';

interface CommentsEditAdminPageProps {
  comment: Comment;
}

const CommentsEditAdminPage: FC<CommentsEditAdminPageProps> = ({ comment }) => {
  const [answer, setAnswer] = useState<string>(comment.comment);
  const [isOpen, setIsOpen] = useState(false);

  const toast = useToast();
  const { displayError } = useToastError();
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
      displayError(e);
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
      displayError(e);
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
          <Box sx={stylesAdmin.header}>
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
              />
              <Button
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
                  handleDeleteSubmit={() =>
                    handleDelete(comment, comment.disciplineTeacherId)
                  }
                  name="цей коментар"
                />
              )}
              <Button size={ButtonSize.MEDIUM} text="Зберегти" type="submit" />
            </Stack>
          </Box>
          <Box sx={styles.body}>
            <Box sx={styles.textArea}>
              <TextArea value={answer} onChange={setAnswer} label="Відгук" />
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CommentsEditAdminPage;