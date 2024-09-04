'use client';
import type { FC } from 'react';
import { TeacherWithContactsResponse } from '@fictadvisor/utils/responses';
import { Stack, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import { EditedComment } from '@/app/admin/teachers/edit/[teacherId]/types';
import Progress from '@/components/common/ui/progress';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

import CommentTextArea from './components/comment-text-area';
import { extractTeacherComments } from './utils/extractTeacherComments';
import * as styles from './EditTeacherComments.styles';

interface EditTeacherCommentsProps {
  teacher: TeacherWithContactsResponse;
  setChangedComments: React.Dispatch<React.SetStateAction<EditedComment[]>>;
}

const EditTeacherComments: FC<EditTeacherCommentsProps> = ({
  teacher,
  setChangedComments,
}) => {
  const qc = useQueryClient();

  const { data: commentsData, isLoading } = useQuery({
    queryKey: ['teachersComments', teacher.id],
    queryFn: () => TeacherAPI.getTeacherComments(teacher.id),
    ...useQueryAdminOptions,
  });

  if (isLoading) return <Progress />;

  if (!commentsData) throw new Error('error ocurred in edit teacher page');

  const refetch = async () => {
    await qc.refetchQueries({ queryKey: ['teachersComments', teacher.id] });
  };

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
