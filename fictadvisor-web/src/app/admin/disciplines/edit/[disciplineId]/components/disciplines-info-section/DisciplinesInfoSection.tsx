'use client';
import { Dispatch, type FC, SetStateAction, useEffect, useState } from 'react';
import { DisciplineTypeEnum } from '@fictadvisor/utils';
import { CreateDisciplineDTO } from '@fictadvisor/utils/requests';
import { ExtendedDisciplineTeachersResponse } from '@fictadvisor/utils/responses';
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

import DisciplineTeacherChange from './discipline-teacher-change/DisciplineTeacherChange';
import * as styles from './DisciplinesInfoSection.styles';

interface DisciplinesInfoSectionProps {
  discipline: ExtendedDisciplineTeachersResponse;
  setBody: Dispatch<SetStateAction<CreateDisciplineDTO>>;
}

const DisciplinesInfoSection: FC<DisciplinesInfoSectionProps> = ({
  discipline,
  setBody,
}) => {
  const [semesterId, setSemesterId] = useState<string>(
    `${discipline.year.toString()} ${discipline.semester.toString()}`,
  );
  const [groupId, setGroupId] = useState<string>(discipline.group.id);
  const [subjectId, setSubjectId] = useState<string>(discipline.subject.id);
  const [disciplineTeachers, setDisciplineTeachers] = useState(
    discipline.teachers.map(teacher => ({
      teacherId: teacher.id,
      disciplineTypes: teacher.disciplineTypes,
    })),
  );
  const [isEditingTeachers, setIsEditingTeachers] = useState(false);

  useEffect(() => {
    setBody({
      groupId,
      semester: parseInt(semesterId.split(' ')[1]),
      year: parseInt(semesterId.split(' ')[0]),
      subjectId,
      teachers: disciplineTeachers.map(teacher => ({
        teacherId: teacher.teacherId,
        disciplineTypes: teacher.disciplineTypes as DisciplineTypeEnum[],
      })),
    });
  }, [semesterId, groupId, subjectId, disciplineTeachers, setBody]);

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

  const deleteTeacher = (id: string) => {
    if (id === '') setIsEditingTeachers(false);
    setDisciplineTeachers([
      ...disciplineTeachers.filter(discipline => discipline.teacherId !== id),
    ]);
  };

  const addNewTeacher = async () => {
    setIsEditingTeachers(true);
    setDisciplineTeachers([
      ...disciplineTeachers,
      {
        teacherId: '',
        disciplineTypes: [],
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
            teachersOptions={teachersOptions.filter(
              t =>
                !disciplineTeachers
                  .map(({ teacherId }) => teacherId)
                  .includes(t.id) || t.id === teacher.teacherId,
            )}
            setIsEditingTeachers={setIsEditingTeachers}
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
      {!isEditingTeachers && (
        <Button
          sx={{ width: '120px', borderRadius: '8px' }}
          text="Додати"
          size={ButtonSize.SMALL}
          variant={ButtonVariant.OUTLINE}
          startIcon={<PlusIcon className="icon" />}
          type="submit"
          onClick={() => addNewTeacher()}
        />
      )}
    </Box>
  );
};

export default DisciplinesInfoSection;
