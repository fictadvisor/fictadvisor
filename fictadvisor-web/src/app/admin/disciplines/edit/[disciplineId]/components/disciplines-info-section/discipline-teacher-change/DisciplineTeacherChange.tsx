'use client';
import { Dispatch, type FC, SetStateAction, useState } from 'react';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { SelectChangeEvent } from '@mui/material';

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
}) => {
  const [disciplineTeacherRoles, setDisciplineTeacherRoles] = useState<
    CheckboxesDropdownOption[]
  >(
    teacher.disciplineTypes.map(disciplineType => ({
      value: disciplineType,
      label: disciplineType,
    })),
  );

  const handleTeacherChange = (newTeacherId: string, oldTeacherId: string) => {
    setDisciplineTeachers(prev => {
      return prev.map(teacher => {
        if (teacher.teacherId === oldTeacherId) {
          const newTeacher = teachersOptions.find(
            teacher => teacher.id === newTeacherId,
          )!;
          teacher = {
            teacherId: newTeacher.id,
            disciplineTypes: teacher.disciplineTypes,
          };
        }
        return teacher;
      });
    });
  };

  const handleRolesChange = (event: SelectChangeEvent) => {
    const values = event.target.value as unknown as DisciplineTypeEnum[];
    setDisciplineTeacherRoles(
      values.map(value => ({
        value: value,
        label: value,
      })),
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
