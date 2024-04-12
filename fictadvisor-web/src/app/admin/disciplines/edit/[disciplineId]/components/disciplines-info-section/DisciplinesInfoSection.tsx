'use client';
import { type FC, useEffect, useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';

import { useDisciplines } from '@/app/admin/disciplines/common/utils/useDisciplines';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Divider from '@/components/common/ui/divider';
import { Dropdown } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import {
  IconButton,
  IconButtonColor,
  IconButtonShape,
} from '@/components/common/ui/icon-button';
import LoadPage from '@/components/common/ui/load-page';
import AddDiscipline from '@/lib/api/discipline/types/AddDiscipline';
import { AdminDiscipline } from '@/types/discipline';

import DisciplineTeacherChange from './discipline-teacher-change/DisciplineTeacherChange';
import * as styles from './DisciplinesInfoSection.styles';

interface DisciplinesInfoSectionProps {
  discipline: AdminDiscipline;
  setBody: React.Dispatch<React.SetStateAction<AddDiscipline>>;
}

const DisciplinesInfoSection: FC<DisciplinesInfoSectionProps> = ({
  discipline,
  setBody,
}) => {
  const [semesterId, setSemesterId] = useState<string>(
    `${discipline.year.toString()} ${discipline.semester.toString()}`,
  );
  // TODO: add groupd id here
  const [groupId, setGroupId] = useState<string>(
    '96145c16-1706-4215-829c-34b2ea80bee2',
  );
  const [subjectId, setSubjectId] = useState<string>(discipline.subject.id);
  const [disciplineTeachers, setDisciplineTeachers] = useState(
    discipline.teachers.map(teacher => ({
      teacherId: teacher.id,
      roles: teacher.roles,
    })),
  );

  useEffect(() => {
    setBody({
      groupId,
      semester: parseInt(semesterId.split(' ')[1]),
      year: parseInt(semesterId.split(' ')[0]),
      subjectId,
      teachers: disciplineTeachers.map(teacher => ({
        teacherId: teacher.teacherId,
        roleNames: teacher.roles,
      })),
    });
  }, [semesterId, groupId, subjectId, disciplineTeachers]);

  const {
    groupsOptions,
    isLoading,
    semesterOptions,
    subjectOptions,
    teachersOptions,
    rolesOptions,
  } = useDisciplines();

  if (isLoading) {
    return <LoadPage />;
  }

  if (
    !(
      groupsOptions &&
      semesterOptions &&
      subjectOptions &&
      teachersOptions &&
      rolesOptions
    )
  )
    throw new Error('an error has occured while fetching data');

  const deleteTeacher = (id: string) =>
    setDisciplineTeachers([
      ...disciplineTeachers.filter(discipline => discipline.teacherId !== id),
    ]);

  const addNewTeacher = async () => {
    setDisciplineTeachers([
      ...disciplineTeachers,
      {
        teacherId: disciplineTeachers.length.toString(),
        roles: [],
      },
    ]);
  };

  return (
    <Box sx={styles.page}>
      <Box sx={styles.mainInfo}>
        <Dropdown
          options={subjectOptions}
          value={subjectId}
          size={FieldSize.MEDIUM}
          label="Предмет"
          placeholder="Предмет"
          disableClearable
          onChange={setSubjectId}
        />
        <Dropdown
          options={groupsOptions}
          value={groupId}
          size={FieldSize.MEDIUM}
          label="Група"
          placeholder="Група"
          disableClearable
          onChange={setGroupId}
        />
        <Dropdown
          options={semesterOptions}
          value={semesterId}
          size={FieldSize.MEDIUM}
          label="Семестр"
          placeholder="Семестр"
          disableClearable
          onChange={setSemesterId}
        />
      </Box>
      <Divider sx={{ width: '714px' }} />
      <Typography sx={{ padding: '16px 0' }}>Викладачі</Typography>
      {disciplineTeachers.map(teacher => (
        <Box key={teacher.teacherId} sx={styles.teacherRow}>
          <DisciplineTeacherChange
            teacher={teacher}
            teachersOptions={teachersOptions}
            rolesOptions={rolesOptions}
            setDisciplineTeachers={setDisciplineTeachers}
          />
          {disciplineTeachers.length > 1 && (
            <IconButton
              style={{ width: '46px', height: '46px', flexShrink: '0' }}
              icon={<TrashIcon />}
              shape={IconButtonShape.CIRCLE}
              color={IconButtonColor.ERROR}
              onClick={() => deleteTeacher(teacher.teacherId)}
            />
          )}
        </Box>
      ))}

      <Button
        sx={{ width: '120px', borderRadius: '8px' }}
        text="Додати"
        size={ButtonSize.SMALL}
        variant={ButtonVariant.OUTLINE}
        startIcon={<PlusIcon className="icon" />}
        type="submit"
        onClick={() => addNewTeacher()}
      />
    </Box>
  );
};

export default DisciplinesInfoSection;
