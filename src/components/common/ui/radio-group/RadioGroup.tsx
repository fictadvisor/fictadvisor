import React, { createContext, FC, ReactNode, useContext } from 'react';
import { useField } from 'formik';

import styles from './RadioGroup.module.scss';

interface RadioContextType {
  value: string;
  onChange: any;
  state: RadioState;
  name: string;
  isDisabled?: boolean;
}

export enum RadioState {
  DEFAULT = 'default',
  ERROR = 'error',
}

export const RadioContext = createContext<RadioContextType>({
  value: '',
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  onChange: () => {},
  state: RadioState.DEFAULT,
  name: '',
  isDisabled: false,
});

interface RadioGroupProps {
  children: ReactNode[];
  onChange?: (value: string) => void;
  name: string;
  value?: string;
  isDisabled?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  name,
  isDisabled = false,
}) => {
  const [field, meta] = useField(name);

  const state =
    meta.touched && meta.error ? RadioState.ERROR : RadioState.DEFAULT;

  return (
    <RadioContext.Provider
      value={{
        state,
        value: field.value,
        onChange: field.onChange,
        name,
        isDisabled,
      }}
    >
      {children}
    </RadioContext.Provider>
  );
};

interface RadioProps {
  text: string;
  value: string;
  isDisabled?: boolean;
}

export const Radio: FC<RadioProps> = ({ text, value, isDisabled = false }) => {
  const {
    value: currentValue,
    name,
    state,
    onChange,
    isDisabled: GroupIsDisabled,
  } = useContext(RadioContext);

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
          onChange={onChange}
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
