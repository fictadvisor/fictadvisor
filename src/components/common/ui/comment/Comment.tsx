import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import * as styles from './Comment.styles';

interface CommentProps {
  text: string;
  semester: 1 | 2;
  year: number;
}

const semesterMap = {
  1: 'I',
  2: 'II',
};

const Comment: FC<CommentProps> = ({ text, semester, year }) => {
  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.text}>{text}</Typography>
      <Typography sx={styles.date}>
        {semesterMap[semester]} семестр {year}
      </Typography>
    </Box>
  );
};

export default Comment;
