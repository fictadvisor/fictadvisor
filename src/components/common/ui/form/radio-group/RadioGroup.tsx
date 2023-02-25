import React from 'react';
import { useField } from 'formik';

import { FieldState } from '@/components/common/ui/form/common/types';

import Radio from './radio-button';

interface RadioGroupOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioGroupOption[];
  isDisabled?: boolean;
  name: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, ...rest }) => {
  const [{ value, onChange }, { touched, error }] = useField(rest.name);

  const state = touched && error ? FieldState.ERROR : FieldState.DEFAULT;

  const radioButtons = options.map((option, index) => (
    <Radio
      key={index}
      state={state}
      selectedValue={value}
      onChange={onChange}
      {...option}
      {...rest}
    />
  ));

  return <> {radioButtons} </>;
};

export default RadioGroup;
