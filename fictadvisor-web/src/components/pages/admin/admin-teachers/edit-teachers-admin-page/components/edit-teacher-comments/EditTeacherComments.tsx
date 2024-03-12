'use client';
import type { FC } from 'react';
import { useQuery } from 'react-query';
import { Stack, Typography } from '@mui/material';
import { isAxiosError } from 'axios';

import Progress from '@/components/common/ui/progress';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import { Teacher } from '@/types/teacher';

import { EditedComment } from '../../types';

import CommentTextArea from './components/comment-text-area';
import { extractTeacherComments } from './utils/extractTeacherComments';
import * as styles from './EditTeacherComments.styles';

interface EditTeacherCommentsProps {
  teacher: Teacher;
  setChangedComments: React.Dispatch<React.SetStateAction<EditedComment[]>>;
}

const EditTeacherComments: FC<EditTeacherCommentsProps> = ({
  teacher,
  setChangedComments,
}) => {
  const toast = useToastError();

  const {
    data: commentsData,
    isSuccess,
    refetch,
  } = useQuery(
    'teachersComments',
    () => TeacherAPI.getTeacherComments(teacher.id),
    {
      onError: error => {
        if (isAxiosError(error)) {
          toast.displayError(error);
        }
      },
    },
  );

  if (!isSuccess) return <Progress />;

  const comments = extractTeacherComments(commentsData);
  return (
    <Stack sx={styles.wrapper}>
      <Typography component="div" sx={styles.subtitle}>
        {comments.length ? 'Коментарі' : 'У викладача немає коментарів'}
      </Typography>
      <Stack sx={styles.commentsWrapper}>
        {comments.map(comment => (
          <CommentTextArea
            key={comment.comment}
            comment={comment}
            setChangedComments={setChangedComments}
            refetch={refetch}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default EditTeacherComments;
