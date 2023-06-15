import { FC } from 'react';
import { Box } from '@mui/material';

import Comment from '@/components/common/ui/comment';
import { GetTeacherCommentsDTO } from '@/lib/api/teacher/dto/GetTeacherCommentsDTO';

import * as styles from './CommentTab.styles';

const CommentTab: FC<GetTeacherCommentsDTO> = ({ questions }) => {
  return (
    <Box sx={styles.wrapper}>
      {questions?.map(question =>
        question.comments.map((comment, index) => (
          <Comment
            key={index}
            text={comment.comment}
            semester={comment.semester}
            year={comment.year}
          />
        )),
      )}
    </Box>
  );
};

export default CommentTab;
