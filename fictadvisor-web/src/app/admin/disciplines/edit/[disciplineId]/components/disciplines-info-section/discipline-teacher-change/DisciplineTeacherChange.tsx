'use client';
import { Dispatch, type FC, SetStateAction, useState } from 'react';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { SelectChangeEvent } from '@mui/material';

import { rolesText } from '@/app/admin/disciplines/common/constants';
import { Dropdown } from '@/components/common/ui/form';
import CheckboxesDropdown from '@/components/common/ui/form/checkboxes-dropdown/CheckboxesDropdown';
import { CheckboxesDropdownOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxesDropdown';
import { FieldSize } from '@/components/common/ui/form/common/types';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

import * as styles from './DisciplineTeacherChange.styles';

interface DisciplineTeacherChangeProps {
  teacher: {
    teacherId: string;
    disciplineTypes: DisciplineTypeEnum[];
  };
  teachersOptions: DropDownOption[];
  rolesOptions: CheckboxesDropdownOption[];
  setIsEditingTeachers: Dispatch<SetStateAction<boolean>>;
  setDisciplineTeachers: Dispatch<
    SetStateAction<
      {
        teacherId: string;
        disciplineTypes: DisciplineTypeEnum[];
      }[]
    >
  >;
}

const DisciplineTeacherChange: FC<DisciplineTeacherChangeProps> = ({
  teacher,
  teachersOptions,
  rolesOptions,
  setDisciplineTeachers,
  setIsEditingTeachers,
}) => {
  const newRoles = teacher.disciplineTypes?.map(role =>
    rolesOptions.find(({ value }) => value === rolesText[role]),
  ) as CheckboxesDropdownOption[];

  const [disciplineTeacherRoles, setDisciplineTeacherRoles] =
    useState<CheckboxesDropdownOption[]>(newRoles);

  const handleTeacherChange = (newTeacherId: string, oldTeacherId: string) => {
    const tmpTeacher = teachersOptions.find(
      teacher => teacher.id === newTeacherId,
    );

    setDisciplineTeachers(prev =>
      prev.map(teacher => {
        if (teacher.teacherId === '') setIsEditingTeachers(false);

        return teacher.teacherId === oldTeacherId || teacher.teacherId === ''
          ? {
              ...teacher,
              teacherId: tmpTeacher?.id ?? '',
            }
          : teacher;
      }),
    );
  };

  const handleRolesChange = (event: SelectChangeEvent) => {
    const newRoles = rolesOptions.filter(role =>
      event.target.value.includes(role.value),
    );

    setDisciplineTeacherRoles(newRoles);
    setDisciplineTeachers(prevTeachers =>
      prevTeachers.map(prev => {
        if (prev.teacherId === teacher.teacherId) {
          prev = {
            teacherId: teacher.teacherId,
            disciplineTypes: newRoles.map(({ id }) => id as DisciplineTypeEnum),
          };
        }
        return prev;
      }),
    );
  };

  return (
    <>
      <Dropdown
        options={teachersOptions}
        value={teacher.teacherId}
        size={FieldSize.MEDIUM}
        width="360px"
        label=""
        placeholder="Викладач"
        disableClearable
        onChange={newValue => handleTeacherChange(newValue, teacher.teacherId)}
      />
      <CheckboxesDropdown
        sx={styles.checkboxDropdown}
        values={rolesOptions}
        selected={disciplineTeacherRoles}
        size={FieldSize.MEDIUM}
        label="Тег"
        handleChange={e => handleRolesChange(e)}
        menuSx={{
          width: '200px',
          minWidth: '0 !important',
        }}
      />
    </>
  );
};

export default DisciplineTeacherChange;
