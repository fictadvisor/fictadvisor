import { FC } from 'react';
import { TabPanel as Panel, TabPanelProps } from '@mui/lab';

const TabPanel: FC<TabPanelProps> = props => {
  return <Panel {...props} />;
};
export default TabPanel;
