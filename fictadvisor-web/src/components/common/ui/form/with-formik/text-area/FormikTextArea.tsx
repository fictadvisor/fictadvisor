import React, { FC } from 'react';
import { useField } from 'formik';

import { TextArea } from '@/components/common/ui/form';
import { TextAreaProps } from '@/components/common/ui/form/with-formik/text-area/types';

interface FormikTextAreaProps extends Omit<TextAreaProps, 'value'> {
  name: string;
}
const FormikTextArea: FC<FormikTextAreaProps> = ({ name, ...props }) => {
  const [{ value }, { touched, error }, { setValue, setTouched }] =
    useField(name);

  const onChange = (value: string) => {
    setTouched(true);
    setValue(value);
  };
  return (
    <TextArea
      {...props}
      touched={touched}
      error={error}
      value={value}
      onChange={onChange}
    />
  );
};

export default FormikTextArea;
