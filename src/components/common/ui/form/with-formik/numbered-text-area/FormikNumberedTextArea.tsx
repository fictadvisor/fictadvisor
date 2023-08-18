import { FC } from 'react';
import { useField } from 'formik';

import NumberedTextArea from '../../numbered-text-area/NumberedTextArea';
import { NumberedTextAreaProps } from '../../numbered-text-area/types';

interface FormikNumberedTextAreaProps
  extends Omit<NumberedTextAreaProps, 'value'> {
  name: string;
}

const FormikNumberedTextArea: FC<FormikNumberedTextAreaProps> = ({
  name,
  ...props
}) => {
  const [{ value }, { touched, error }, { setValue, setTouched }] =
    useField(name);

  const onChange = (value: string) => {
    setTouched(true);
    setValue(value);
  };

  return (
    <NumberedTextArea
      {...props}
      touched={touched}
      error={error}
      value={value}
      onChange={onChange}
    />
  );
};

export default FormikNumberedTextArea;
