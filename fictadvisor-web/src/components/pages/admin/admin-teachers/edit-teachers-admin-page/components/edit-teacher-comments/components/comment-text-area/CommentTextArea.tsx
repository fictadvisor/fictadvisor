import React, { FC, useEffect, useState } from 'react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Stack, Typography } from '@mui/material';
import { isAxiosError } from 'axios';

import TextArea from '@/components/common/ui/form/text-area-mui';
import { IconButtonShape } from '@/components/common/ui/icon-button';
import IconButton from '@/components/common/ui/icon-button-mui';
import { IconButtonColor } from '@/components/common/ui/icon-button-mui/types';
import { TeacherCommentAdmin } from '@/components/pages/admin/admin-teachers/common/types';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import { GetTeacherCommentsResponse } from '@/lib/api/teacher/types/GetTeacherCommentsResponse';

import { EditedComment } from '../../../../types';

import * as styles from './CommentTextArea.styles';

interface CommentTextAreaProps {
  comment: TeacherCommentAdmin;
  setChangedComments: React.Dispatch<React.SetStateAction<EditedComment[]>>;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<GetTeacherCommentsResponse, unknown>>;
}
const CommentTextArea: FC<CommentTextAreaProps> = ({
  comment,
  setChangedComments,
  refetch,
}) => {
  const toast = useToast();
  const toastError = useToastError();
  const handleDeleteSubmit = async () => {
    try {
      await TeacherAPI.deleteComment(
        {
          userId: comment.userId,
          questionId: comment.questionId,
        },
        comment.disciplineTeacherId,
      );
      refetch();
      toast.success('Коментар успішно видалений!', '', 4000);
    } catch (e) {
      if (isAxiosError(e)) {
        toastError.displayError(e);
      }
    }
  };

  const [value, setValue] = useState<string>(comment.comment);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChangedComments(prev => {
        const foundComment = prev.find(
          c =>
            c.userId === comment.userId &&
            c.questionId === comment.questionId &&
            c.disciplineTeacherId === comment.disciplineTeacherId,
        );
        if (foundComment) {
          return prev.map(c => {
            if (c.userId === comment.userId) {
              return {
                ...c,
                comment: value,
              };
            }
            return c;
          });
        }
        return [
          ...prev,
          {
            ...comment,
            comment: value,
          },
        ];
      });

      setChangedComments(prev =>
        prev.filter(c => c.comment !== comment.comment),
      );
    }, 250);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Stack direction="row" alignItems="center" gap="16px">
      <Stack sx={styles.textAreaWrapper}>
        <TextArea
          label=""
          value={value}
          sx={styles.textArea}
          onChange={setValue}
        />
        <Typography sx={styles.text}>{`${
          comment.semester === 1 ? 'I' : 'II'
        } семестр ${comment.year}`}</Typography>
      </Stack>
      <IconButton
        icon={<TrashIcon width={24} height={24} />}
        sx={styles.trashIcon}
        color={IconButtonColor.SECONDARY}
        shape={IconButtonShape.CIRCLE}
        onClick={handleDeleteSubmit}
      />
    </Stack>
  );
};

export default CommentTextArea;
