import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { TeacherComment } from '@/types/teacher';

import * as styles from './Comment.styles';

interface CommentProps extends Omit<TeacherComment, 'discipline'> {}

const semesterMap = {
  1: 'I',
  2: 'II',
};

const Comment: FC<CommentProps> = ({ comment, semester, year }) => {
  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.text}>{comment}</Typography>
      <Typography sx={styles.date}>
        {semesterMap[semester]} семестр {year} - {year + 1}
      </Typography>
    </Box>
  );
};

export default Comment;
