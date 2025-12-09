'use client';

import React, { FC, use, useState } from 'react';
import { DeleteCommentDTO } from '@fictadvisor/utils/requests';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, CardHeader, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import { createValidationSchema } from '@/app/admin/comments/common/types';
import * as styles from '@/app/admin/comments/edit/[comment]/CommentsEditAdminPage.styles';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

import TextArea from '../../../../../components/common/ui/form/text-area-mui';

interface AdminCommentEditProps {
  params: Promise<{
    comment: string;
  }>;
}

const AdminCommentEdit: FC<AdminCommentEditProps> = ({ params }) => {
  const comment = JSON.parse(decodeURIComponent(use(params).comment));
  const [answer, setAnswer] = useState<string>(comment.comment);
  const [isOpen, setIsOpen] = useState(false);

  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();

  const handleDelete = async (
    data: DeleteCommentDTO,
    disciplineTeacherId: string,
  ) => {
    try {
      await TeacherAPI.deleteComment(disciplineTeacherId, data);
      toast.success('Відгук успішно видалений!', '', 4000);
      router.replace('/admin/comments');
    } catch (e) {
      displayError(e);
    }
  };

  const handleEdit = async () => {
    try {
      await TeacherAPI.updateComment(comment.disciplineTeacherId, {
        userId: comment.userId,
        questionId: comment.questionId,
        comment: answer,
      });
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

export default AdminCommentEdit;
