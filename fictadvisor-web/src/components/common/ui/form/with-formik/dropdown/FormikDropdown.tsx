'use client';

import { FC, useEffect } from 'react';
import { useField } from 'formik';

import Dropdown from '@/components/common/ui/form/dropdown';
import { DropdownProps } from '@/components/common/ui/form/dropdown/types';

export interface FormikDropdownProps
  extends Omit<DropdownProps, 'value' | 'onChange'> {
  name: string;
  clearOnUnmount?: boolean;
}

const FormikDropdown: FC<FormikDropdownProps> = ({
  name,
  clearOnUnmount = false,
  ...props
}) => {
  const [{ value }, { touched, error }, { setValue, setTouched }] =
    useField(name);

  const onChange = (option: string) => {
    setTouched(true);
    setValue(option);
  };

  useEffect(() => {
    window.addEventListener('mousemove', () => {});

    return () => {
      window.removeEventListener('mousemove', () => {});
      if (clearOnUnmount) {
        setValue('');
      }
    };
  }, []);

  return (
    <Dropdown
      {...props}
      value={value}
      touched={touched}
      error={error}
      onChange={onChange}
    />
  );
};

export default FormikDropdown;
