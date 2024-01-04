import React, { FC } from 'react';
import { useField } from 'formik';

import Input from '@/components/common/ui/form/input-mui';
import { InputProps } from '@/components/common/ui/form/input-mui/types';

interface FormikInputProps extends Omit<InputProps, 'onChange' | 'value'> {
  name: string;
}

const FormikInput: FC<FormikInputProps> = ({ name, ...rest }) => {
  const [field, { touched, error }, { setTouched, setValue }] = useField(name);

  const handleChange = async (value: string) => {
    await setTouched(true);
    await setValue(value);
  };

  return (
    <Input
      {...rest}
      {...field}
      onChange={handleChange}
      touched={touched}
      error={error}
    />
  );
};

export default FormikInput;
