import React, { FC } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Box, Typography } from '@mui/material';
import { useField } from 'formik';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { SharedEventBody } from '@/lib/api/schedule/types/shared';
import { useSchedule } from '@/store/schedule/useSchedule';

import { ScheduleDropdown } from '../schedule-dropdown/ScheduleDropdown';

import * as styles from './AddDeleteTeachers.styles';

const MAX_TEACHERS_SIZE = 5;
interface AddDeleteTeachersProps {
  name: string;
  teacherOptions: DropDownOption[];
}

export const AddDeleteTeachers: FC<AddDeleteTeachersProps> = ({
  name,
  teacherOptions,
}) => {
  const [{ value: teachers }, { touched, error }, { setValue, setTouched }] =
    useField<SharedEventBody['teachers']>(name);

  const handleValueChange = (
    newTeacherId: string,
    oldTeacherId: string,
    index: number,
  ) => {
    const newTeachers = [...teachers];
    newTeachers[index] = newTeacherId;
    setTouched(true);
    setValue(newTeachers);
  };

  const handleAddTeacher = () => {
    const newTeachers = [...teachers];
    newTeachers.push('');
    setValue(newTeachers);
  };

  const handleDeleteTeacher = () => {
    const newTeachers = teachers.slice(0, teachers.length - 1);
    setValue(newTeachers);
  };

  return (
    <Box sx={styles.container}>
      {teachers.length === 0 && (
        <Typography typography={'body3Medium'} pl={'12px'}>
          Викладачів не додано
        </Typography>
      )}
      {teachers.map((teacherId, i) => (
        <ScheduleDropdown
          key={i}
          onChange={newValue => handleValueChange(newValue, teacherId, i)}
          value={teacherId}
          options={teacherOptions}
          placeholder={'Оберіть викладача'}
        />
      ))}
      {touched && error && (
        <Typography sx={styles.errorRemark}>{error}</Typography>
      )}
      <Box sx={styles.actions}>
        <Button
          text="Додати"
          onClick={handleAddTeacher}
          variant={ButtonVariant.TEXT}
          startIcon={<PlusIcon />}
          size={ButtonSize.SMALL}
          sx={styles.btn}
          disabled={teachers.length >= MAX_TEACHERS_SIZE}
        />
        <Button
          text="Видалити"
          sx={styles.redBtn}
          onClick={handleDeleteTeacher}
          variant={ButtonVariant.TEXT}
          startIcon={<MinusIcon />}
          color={ButtonColor.PRIMARY}
          size={ButtonSize.SMALL}
          disabled={teachers.length === 0}
        />
      </Box>
    </Box>
  );
};
