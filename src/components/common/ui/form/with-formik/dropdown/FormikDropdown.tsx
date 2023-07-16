import { FC } from 'react';
import { useField } from 'formik';

import Dropdown from '@/components/common/ui/form/dropdown';
import { DropdownProps } from '@/components/common/ui/form/dropdown/types';

interface FormikDropdownProps
  extends Omit<DropdownProps, 'value' | 'onChange'> {
  name: string;
}

const FormikDropdown: FC<FormikDropdownProps> = ({ name, ...props }) => {
  const [{ value }, { touched, error }, { setValue, setTouched }] =
    useField(name);

  const onChange = (option: string) => {
    setTouched(true);
    setValue(option);
  };

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
