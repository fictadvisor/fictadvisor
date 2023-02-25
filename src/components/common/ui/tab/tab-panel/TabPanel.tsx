import { FC, ReactNode, useContext } from 'react';

import { TabListContext } from '../tab-panels-list/TabPanelsList';

interface ITabPanelProps {
  children: ReactNode;
  value: string;
  className: string;
}

export const TabPanel: FC<ITabPanelProps> = ({
  value,
  children,
  className,
}) => {
  const { currentValue } = useContext(TabListContext);
  return (
    <div
      className={className}
      style={{ display: value == currentValue ? 'block' : 'none' }}
    >
      {children}
    </div>
  );
};
