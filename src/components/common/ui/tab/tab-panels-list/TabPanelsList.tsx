import { createContext, FC, ReactNode } from 'react';
import mergeClassNames from 'merge-class-names';

import styles from './TabPanelsList.module.scss';

interface ITabPanelsListProps {
  children: ReactNode;
  currentValue: string;
  className: string;
}

interface ITabListContextType {
  currentValue: string;
}

export const TabListContext = createContext<ITabListContextType>({
  currentValue: '',
});

export const TabPanelsList: FC<ITabPanelsListProps> = ({
  children,
  currentValue,
  className,
}) => {
  return (
    <div className={mergeClassNames(styles[className])}>
      <TabListContext.Provider value={{ currentValue }}>
        {children}
      </TabListContext.Provider>
    </div>
  );
};
