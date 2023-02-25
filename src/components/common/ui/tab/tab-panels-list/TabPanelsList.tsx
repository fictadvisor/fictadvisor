import { createContext, FC, ReactNode } from 'react';

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
    <div className={className}>
      <TabListContext.Provider value={{ currentValue }}>
        {children}
      </TabListContext.Provider>
    </div>
  );
};
