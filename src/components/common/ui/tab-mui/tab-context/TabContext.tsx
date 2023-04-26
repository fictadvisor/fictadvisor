import { FC } from 'react';
import { TabContext as Context, TabContextProps } from '@mui/lab';

const TabContext: FC<TabContextProps> = props => {
  return <Context {...props} />;
};

export default TabContext;
