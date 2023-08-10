import React, { ChangeEvent, FC, useEffect } from 'react';
import { FormControlLabel, RadioGroup } from '@mui/material';
import { RadioGroupProps } from '@mui/material/RadioGroup/RadioGroup';
import { useField } from 'formik';

import FormikRadio from '@/components/common/ui/form/with-formik/radio/FormikRadio';

interface GroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormikRadioGroup extends RadioGroupProps {
  options: GroupOption[];
  name: string;
  //kostili ebani
  clearValueOnUnmount?: boolean;
}

const FormikRadioGroup: FC<FormikRadioGroup> = ({
  options,
  name,
  clearValueOnUnmount = false,
  onChange,
  ...props
}: FormikRadioGroup) => {
  const [field, , helpers] = useField(name);

  useEffect(() => {
    window.addEventListener('mousemove', () => {});

    // returned function will be called on component unmount
    return () => {
      window.removeEventListener('mousemove', () => {});
      if (clearValueOnUnmount) {
        helpers.setValue('');
      }
    };
  }, []);

  return (
    <RadioGroup
      {...field}
      {...props}
      onChange={(event: ChangeEvent<HTMLInputElement>, value: string) => {
        if (onChange) onChange(event, value);
        helpers.setValue(value);
      }}
      sx={{ gap: '12px' }}
    >
      {options.map(option => (
        <FormControlLabel
          key={option.label}
          value={option.value}
          control={<FormikRadio disabled={option.disabled} />}
          label={option.label}
          sx={{ gap: '8px', margin: '0', width: 'fit-content' }}
        />
      ))}
    </RadioGroup>
  );
};

export default FormikRadioGroup;
