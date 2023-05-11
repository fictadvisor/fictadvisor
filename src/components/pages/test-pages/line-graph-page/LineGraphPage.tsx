import { Box } from '@mui/material';

import LineGraph from '@/components/common/ui/line_graph';

import * as styles from './LineGraph.styles';

const LineGraphPage = () => (
  <Box sx={styles.wrapper}>
    <LineGraph value={0} label="1. Доступність оцінок" />
    <LineGraph value={10} label="1. Доступність оцінок" />
    <LineGraph value={20} label="2. Комунікативність" />
    <LineGraph value={30} label="3. Якась еще хуйня" />
    <LineGraph value={40} label="4. І ЕЩЕ ЯКАСЬ ХУЙНЯ" />
    <LineGraph value={50} label="5. НУ І ЕЩЕ ЯКАСЬ ХУЙНЯ" />
    <LineGraph value={60} label="6. АХАХХАХАХ" />
    <LineGraph value={70} label="6. АХАХХАХАХ" />
    <LineGraph value={80} label="6. АХАХХАХАХ" />
    <LineGraph value={90} label="6. АХАХХАХАХ" />
    <LineGraph value={100} label="6. АХАХХАХАХ" />
  </Box>
);

export default LineGraphPage;
