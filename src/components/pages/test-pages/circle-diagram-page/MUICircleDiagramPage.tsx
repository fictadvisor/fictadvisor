import { Box, Container } from '@mui/material';

import CircleDiagram from '@/components/common/ui/circle-diagram';

import * as styles from './MUICircleDiagramPage.styles';
const CircleDiagramPage = () => {
  return (
    <Container sx={styles.forContainer}>
      <Box sx={styles.forBox}>
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((item, i) => {
          return <CircleDiagram key={i} value={item} />;
        })}
      </Box>
    </Container>
  );
};

export default CircleDiagramPage;
