import React, { FC, useEffect } from 'react';
import { useField } from 'formik';

import Dropdown from '@/components/common/ui/form/dropdown';
import { DropdownProps } from '@/components/common/ui/form/dropdown/types';
import FormikDropdown, {
  FormikDropdownProps,
} from '@/components/common/ui/form/with-formik/dropdown/FormikDropdown';

import * as styles from './ScheduleDropdown.styles';

export const ScheduleFormikDropdown: FC<FormikDropdownProps> = ({
  clearOnUnmount,
  name,
  ...props
}) => {
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
      showRemark={!!error}
      dropdownSx={styles.dropdown}
      inputSx={styles.input()}
      onChange={onChange}
      label={''}
      remarkSx={styles.remark}
    />
  );
};

export const ScheduleDropdown: FC<DropdownProps> = props => {
  return (
    <Dropdown
      {...props}
      label={''}
      dropdownSx={styles.dropdown}
      inputSx={styles.input()}
      showRemark={false}
      remarkSx={styles.remark}
    />
  );
};
export default ScheduleDropdown;
