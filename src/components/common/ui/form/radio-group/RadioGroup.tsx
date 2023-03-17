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
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  className,
  ...rest
}) => {
  const [field, { touched, error }] = useField(rest.name);

  const state = touched && error ? FieldState.ERROR : FieldState.DEFAULT;

  const radioButtons = options.map((option, index) => (
    <Radio
      key={index}
      state={state}
      selectedValue={field.value}
      onChange={field.onChange}
      {...option}
      {...rest}
    />
  ));

  return <div className={className}> {radioButtons} </div>;
};

export default RadioGroup;
