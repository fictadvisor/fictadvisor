import { Box } from '@mui/material';

import Comment from '@/components/common/ui/comment';

import * as styles from './CommentTestPage.styles';

const text =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad beatae corporis cupiditate nemo, provident quibusdam temporibus velit! Dolore ducimus et laudantium odio porro rerum sequi soluta. Esse natus non officia.';

const CommentTestPage = () => {
  return (
    <Box sx={styles.wrapper}>
      <Comment text={text} semester={2} year={2023} />
      <Comment text={text + text} semester={1} year={2022} />
      <Comment text={text + text + text} semester={2} year={2024} />
    </Box>
  );
};

export default CommentTestPage;
