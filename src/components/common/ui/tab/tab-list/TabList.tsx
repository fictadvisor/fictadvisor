import { createContext, FC, ReactNode } from 'react';

interface ITabListProps {
  children: ReactNode;
  className: string;
  onChange?: (value: string) => void;
  currentValue: string;
}

interface ITabContextType {
  onChange?: (string) => void;
  currentValue: string;
}

export const TabContext = createContext<ITabContextType>({
  currentValue: '',
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  onChange: (value: string) => {},
});

export const TabList: FC<ITabListProps> = ({
  className,
  children,
  onChange,
  currentValue,
}) => {
  return (
    <div className={className}>
      <TabContext.Provider value={{ onChange, currentValue }}>
        {children}
      </TabContext.Provider>
    </div>
  );
};
