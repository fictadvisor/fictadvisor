import { FC, ReactNode, useContext } from 'react';
import mergeClassNames from 'merge-class-names';

import { TabListContext } from '../tab-panels-list/TabPanelsList';

import styles from './TabPanel.module.scss';

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
      className={mergeClassNames(styles[className])}
      style={{ display: value == currentValue ? 'block' : 'none' }}
    >
      {children}
    </div>
  );
};
