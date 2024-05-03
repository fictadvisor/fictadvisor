import React, { FC, useEffect } from 'react';
import { useField } from 'formik';
import moment, { Moment } from 'moment';

import Dropdown from '@/components/common/ui/form/dropdown';
import { FormikDropdownProps } from '@/components/common/ui/form/with-formik/dropdown/FormikDropdown';

import { getDateWithTimeSet } from '../../utils/getDateWithTimeSet';

import * as styles from './ScheduleDropdown.styles';

interface TimeScheduleDropdownProps extends FormikDropdownProps {
  date: Moment;
}

const TimeScheduleDropdown: FC<TimeScheduleDropdownProps> = ({
  name,
  date,
  ...props
}) => {
  const [{ value }, { touched, error }, { setValue, setTouched }] =
    useField(name);

  useEffect(() => {
    setValue(getDateWithTimeSet(date, value));
  }, [date]);

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
      label=""
      remarkSx={styles.remark}
    />
  );
};
export default TimeScheduleDropdown;
