import { FC } from 'react';
import { TabList as List, TabListProps } from '@mui/lab';

const TabList: FC<TabListProps> = props => {
  return (
    <List
      TabIndicatorProps={{
        style: { display: 'none' },
      }}
      aria-label="lab tabs"
      {...props}
    />
  );
};

export default TabList;
