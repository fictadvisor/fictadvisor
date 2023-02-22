import React, { createContext, FC, ReactNode, useContext } from 'react';

import styles from './RadioGroup.module.scss';

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

interface RadioContextType {
  value: string;
  onChange: (value: string) => void;
  name: string;
  isDisabled?: boolean;
}

export enum RadioState {
  DEFAULT = 'default',
  ERROR = 'error',
}

interface RadioProps {
  text: string;
  value: string;
  state?: RadioState;
  isDisabled?: boolean;
}

export const Radio: FC<RadioProps> = ({
  text,
  value,
  state = RadioState.DEFAULT,
  isDisabled = false,
}) => {
  const {
    value: currentValue,
    name,
    onChange,
    isDisabled: GroupIsDisabled,
  } = useContext(RadioContext);

  const handleChange = () => {
    onChange(value);
  };

  const additional = GroupIsDisabled || isDisabled ? '-disabled' : '';

  return (
    <div className={styles['radio-container']}>
      <label>
        <input
          className={styles[state + '-radio-input' + `${additional}`]}
          type="radio"
          name={name}
          value={value}
          disabled={GroupIsDisabled || isDisabled}
          checked={value === currentValue}
          onChange={handleChange}
        />
        <span className={styles[state + '-radio-box' + `${additional}`]}></span>
      </label>
      <span className={styles[state + '-radio-text' + `${additional}`]}>
        {text}
      </span>
    </div>
  );
};

export default RadioGroup;
