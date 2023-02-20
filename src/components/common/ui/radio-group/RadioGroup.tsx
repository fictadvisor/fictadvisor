import React, { createContext, ReactNode } from 'react';

interface RadioContextType {
  value: string;
  onChange: (value: string) => void;
  name: string;
  isDisabled?: boolean;
}

export const RadioContext = createContext<RadioContextType>({
  value: '',
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  onChange: () => {},
  name: '',
  isDisabled: false,
});

interface RadioGroupProps {
  children: ReactNode[];
  onChange: (value: string) => void;
  name: string;
  value?: string;
  isDisabled?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  onChange,
  name,
  value,
  isDisabled = false,
}) => (
  <RadioContext.Provider value={{ value, onChange, name, isDisabled }}>
    {children}
  </RadioContext.Provider>
);
export default RadioGroup;
