import React, { FC } from 'react';
import { Skeleton, Stack, TableCell, TableRow } from '@mui/material';

import * as styles from './TeachersSkeleton.styles';

interface TeachersSkeletonProps {
  isLoading?: boolean;
}

const TeachersSkeleton: FC<TeachersSkeletonProps> = () => {
  return (
    <TableRow>
      <TableCell sx={styles.bodyItem}>
        <Stack sx={styles.tableColumn}>
          <Skeleton variant="circular" sx={{ width: 36, height: 36 }} />
          <Skeleton
            variant="text"
            sx={{ ml: '16px', width: 200, height: 36 }}
          />
        </Stack>
      </TableCell>
      <TableCell sx={styles.bodyItem}>
        <Stack sx={styles.tableColumn}>
          <Skeleton variant="text" sx={styles.tag} />
          <Skeleton variant="text" sx={styles.tag} />
        </Stack>
      </TableCell>
      <TableCell sx={styles.bodyItem}>
        <Stack sx={styles.tableColumn}>
          <Skeleton variant="text" sx={styles.longTag} />
          <Skeleton variant="text" sx={styles.longTag} />
          <Skeleton variant="text" sx={styles.longTag} />
        </Stack>
      </TableCell>
      <TableCell sx={styles.bodyItem}>
        <Stack sx={styles.tableColumn}>
          <Skeleton variant="rounded" sx={styles.button} />
          <Skeleton variant="circular" sx={{ width: 36, height: 36 }} />
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default TeachersSkeleton;
