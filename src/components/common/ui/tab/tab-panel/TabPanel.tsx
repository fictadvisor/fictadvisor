import { FC } from 'react';
import { TabPanel as MuiTabPanel, TabPanelProps } from '@mui/lab';

import * as styles from './TabPanel.styles';

const TabPanel: FC<TabPanelProps> = props => {
  return <MuiTabPanel sx={styles.tabPanel} {...props} />;
};
export default TabPanel;
