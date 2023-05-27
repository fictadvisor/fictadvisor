import { Box, List } from '@mui/material';

import Rating from '@/components/common/ui/rating-mui/Rating';

import * as styles from './RatingTestPage.styles';

const RatingTestPage = () => {
  return (
    <Box sx={styles.wrapper}>
      <List sx={styles.row}>
        <Box sx={styles.column}>
          <Rating rating={2} />
          <Rating rating={3.5} />
          <Rating rating={5} />
          <Rating rating={0} />
        </Box>
        <Box sx={styles.column}>
          <Rating rating={2} />
          <Rating rating={3.7} />
          <Rating rating={2.4} />
          <Rating rating={1.3} />
        </Box>
      </List>
    </Box>
  );
};

export default RatingTestPage;
