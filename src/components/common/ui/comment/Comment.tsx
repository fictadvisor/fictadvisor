import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import * as styles from './Comment.styles';

interface CommentProps {
  text: string;
  semester: string;
  year: number;
}

const Comment: FC<CommentProps> = ({ text, semester, year }) => {
  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.text}>{text}</Typography>
      <Typography sx={styles.date}>
        {semester} семестр {year}
      </Typography>
    </Box>
  );
};

export default Comment;
