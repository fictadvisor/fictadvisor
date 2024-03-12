import React, { FC } from 'react';
import { QueryObserverBaseResult } from 'react-query';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { isAxiosError } from 'axios';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { TrashBucketButton } from '@/components/common/ui/icon-button-mui/variants';
import CommentsSkeleton from '@/components/pages/admin/admin-comments/components/admin-comments-table/components/comments-skeleton';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import { DeleteCommentBody } from '@/lib/api/teacher/types/DeleteCommentBody';
import { Comment } from '@/lib/api/teacher/types/GetCommentsWithPaginationResponse';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

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
          comments.map((comment, index) => (
            <TableRow key={index}>
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
                <Stack sx={styles.buttonsColumn}>
                  <Button
                    href={`/admin/comments/edit/${encodeURIComponent(
                      JSON.stringify(comment),
                    )}`}
                    text="Редагувати"
                    variant={ButtonVariant.OUTLINE}
                    startIcon={<PencilSquareIcon />}
                    size={ButtonSize.SMALL}
                    sx={styles.button}
                  />
                  <TrashBucketButton
                    onClick={() =>
                      handleDelete(comment, comment.disciplineTeacherId)
                    }
                  />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default CommentsTable;
