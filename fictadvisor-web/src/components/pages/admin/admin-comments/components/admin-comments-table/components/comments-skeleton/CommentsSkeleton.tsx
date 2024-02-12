import React, { FC } from 'react';
import { Skeleton, Stack, TableCell, TableRow } from '@mui/material';

interface CommentsSkeletonProps {
  isLoading?: boolean;
}

const CommentsSkeleton: FC<CommentsSkeletonProps> = () => {
  return (
    <TableRow>
      <TableCell>
        <Stack>
          <Skeleton variant="text" />
        </Stack>
      </TableCell>
      <TableCell>
        <Stack>
          <Skeleton variant="text" />
        </Stack>
      </TableCell>
      <TableCell>
        <Stack>
          <Skeleton variant="text" />
        </Stack>
      </TableCell>
      <TableCell>
        <Stack>
          <Skeleton variant="text" />
        </Stack>
      </TableCell>
      <TableCell>
        <Stack>
          <Skeleton />
          <Skeleton />
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default CommentsSkeleton;
