import React, { FC } from 'react';
import { QueryObserverBaseResult } from 'react-query';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import CommentsSkeleton from '@/components/pages/admin/admin-comments/components/admin-comments-table/components/comments-skeleton';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import { DeleteCommentBody } from '@/lib/api/teacher/types/DeleteCommentBody';
import { Comment } from '@/lib/api/teacher/types/GetCommentsWithPaginationResponse';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import TableActions from './components/table-actions';
import * as styles from './CommentsTable.styles';

interface AnswersAdminTableProps {
  comments?: Comment[];
  isLoading?: boolean;
  count: number;
  refetch: QueryObserverBaseResult['refetch'];
}

const CommentsTable: FC<AnswersAdminTableProps> = ({
  comments,
  isLoading,
  count,
  refetch,
}) => {
  const toastError = useToastError();
  const toast = useToast();

  const handleDelete = async (
    data: DeleteCommentBody,
    disciplineTeacherId: string,
  ) => {
    try {
      await TeacherAPI.deleteComment(data, disciplineTeacherId);
      await refetch();
      toast.success('Відгук видалено успішно');
    } catch (e) {
      toastError.displayError(e);
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={mergeSx(styles.headItem, { minWidth: '45px' })}>
            <Typography>Відгук</Typography>
          </TableCell>
          <TableCell sx={styles.headItem}>
            <Typography>Викладач</Typography>
          </TableCell>
          <TableCell sx={styles.headItem}>
            <Typography>Предмет</Typography>
          </TableCell>
          <TableCell sx={styles.headItem}>
            <Typography>Семестр</Typography>
          </TableCell>
          <TableCell sx={styles.headItem} />
        </TableRow>
      </TableHead>
      <TableBody>
        {isLoading && (
          <>
            {Array.from({ length: count }, (_, index) => (
              <CommentsSkeleton key={index} />
            ))}
          </>
        )}
        {comments &&
          comments.map(comment => (
            <TableRow
              key={`${comment.userId} ${comment.disciplineTeacherId} ${comment.questionId}`}
            >
              <TableCell sx={styles.commentItem}>
                <Stack sx={styles.tableColumn}>
                  <Typography>{comment.comment}</Typography>
                </Stack>
              </TableCell>
              <TableCell sx={styles.bodyItem}>
                <Stack sx={styles.tableColumn}>
                  <Typography>
                    {comment.teacher.lastName} {comment.teacher.firstName[0]}.{' '}
                    {comment.teacher.middleName[0]}.
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell sx={styles.subjectItem}>
                <Stack sx={styles.tableColumn}>
                  <Typography>{comment.subject.name}</Typography>
                </Stack>
              </TableCell>
              <TableCell sx={styles.bodyItem}>
                <Stack sx={styles.tableColumn}>
                  <Typography>
                    {comment.semester === 1 ? 'I' : 'II'} семестр {comment.year}
                    - {comment.year + 1}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell sx={styles.bodyItem}>
                <TableActions handleDelete={handleDelete} comment={comment} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default CommentsTable;
