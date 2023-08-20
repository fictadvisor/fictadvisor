import { FC } from 'react';
import { TabContext as MuiTabContext, TabContextProps } from '@mui/lab';

const TabContext: FC<TabContextProps> = props => {
  return <MuiTabContext {...props} />;
};

export default TabContext;
