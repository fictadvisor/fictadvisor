import { createContext, FC, ReactNode } from 'react';

interface ITabListProps {
  children: ReactNode;
  className: string;
  onChange?: (number) => void;
}

interface ITabContextType {
  onChange?: (number) => void;
}

export const TabContext = createContext<ITabContextType>({
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  onChange: (value: number) => {},
});

export const TabList: FC<ITabListProps> = ({
  className,
  children,
  onChange,
}) => {
  return (
    <div className={className}>
      <TabContext.Provider value={{ onChange }}>{children}</TabContext.Provider>
    </div>
  );
};
