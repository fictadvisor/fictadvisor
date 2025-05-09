'use client';
import React, { useState } from 'react';
import { DisciplineTypeEnum } from '@fictadvisor/utils';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Box, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import {
  rolesData,
  rolesRepres,
} from '@/app/admin/disciplines/common/constants';
import { useDisciplines } from '@/app/admin/disciplines/common/utils/useDisciplines';
import * as styles from '@/app/admin/disciplines/create/CreateDisciplinesAdminPage.styles';
import { disciplineTeacherInitialValues } from '@/app/admin/disciplines/search/constants';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Divider from '@/components/common/ui/divider';
import { Dropdown } from '@/components/common/ui/form';
import CheckboxesDropdown from '@/components/common/ui/form/checkboxes-dropdown/CheckboxesDropdown';
import { FieldSize } from '@/components/common/ui/form/common/types';
import {
  IconButton,
  IconButtonColor,
  IconButtonShape,
  IconButtonSize,
} from '@/components/common/ui/icon-button';
import LoadPage from '@/components/common/ui/load-page';
import useToast from '@/hooks/use-toast';
import DisciplineAPI from '@/lib/api/discipline/DisciplineAPI';
import { DisciplineTeacher } from '@/types/teacher';

const AdminSubjectCreate = () => {
  const [semesterId, setSemesterId] = useState<string>('');
  const [groupId, setGroupId] = useState<string>('');
  const [subjectId, setSubjectId] = useState<string>('');
  const [disciplineTeachers, setDisciplineTeachers] = useState<
    DisciplineTeacher[]
  >([]);
  const [isEditingTeachers, setIsEditingTeachers] = useState(false);

  const toast = useToast();
  const router = useRouter();

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
      ...disciplineTeachers.filter(teacher => teacher.id != id),
    ]);
  };

  const handleTeacherChange = (teacherId: string) => {
    const tmpTeacher = teachersOptions.find(x => x.id === teacherId);

    setDisciplineTeachers(prev =>
      prev.map(teacher => {
        if (teacher.id === '') setIsEditingTeachers(false);

        return teacher.id === teacherId || teacher.id === ''
          ? {
              ...teacher,
              ...tmpTeacher,
            }
          : teacher;
      }),
    );
  };

  const addNewTeacher = async () => {
    setIsEditingTeachers(true);
    setDisciplineTeachers([
      ...disciplineTeachers,
      disciplineTeacherInitialValues,
    ]);
  };

  const handleRolesChange = (
    event: SelectChangeEvent,
    teacher: DisciplineTeacher,
  ) => {
    const values = event.target.value as unknown as DisciplineTypeEnum[];
    setDisciplineTeachers(prev =>
      prev.map(initTeacher => {
        if (initTeacher.id === teacher.id) {
          initTeacher.disciplineTypes = values;
        }
        return initTeacher;
      }),
    );
  };

  const isValuesSet = () => {
    let isTeacherSet = true;
    disciplineTeachers.forEach(teacher => {
      if (!teacher.id || !teacher.disciplineTypes.length) isTeacherSet = false;
    });
    return !(
      subjectId == '' ||
      semesterId == '' ||
      groupId == '' ||
      !isTeacherSet
    );
  };

  const saveDiscipline = () => {
    if (isValuesSet()) {
      DisciplineAPI.addDiscipline({
        groupId: groupId,
        semester: parseInt(semesterId.split(' ')[1]),
        year: parseInt(semesterId.split(' ')[0]),
        subjectId: subjectId,
        teachers: disciplineTeachers.map(teacher => ({
          teacherId: teacher.id,
          disciplineTypes: teacher.disciplineTypes.map(
            discipline => rolesData[rolesRepres.indexOf(discipline)],
          ),
        })),
      });
      toast.success('Дисциплну успішно додано', '', 4000);
      router.push('/admin/disciplines');
    } else {
      toast.error('Всі поля повинні бути заповнені', '', 4000);
    }
  };

  return (
    <Box sx={{ p: '16px' }}>
      <Box sx={stylesAdmin.header}>
        <Box sx={stylesAdmin.editName}>
          <Typography variant="h5">Створення дисципліни</Typography>
        </Box>
        <Stack flexDirection="row" gap="8px">
          <Button
            sx={styles.button}
            size={ButtonSize.MEDIUM}
            color={ButtonColor.SECONDARY}
            text="Скасувати"
            href="/admin/disciplines"
          />
          <Button
            sx={styles.button}
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            onClick={() => saveDiscipline()}
          />
        </Stack>
      </Box>
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
            onChange={(id: string) => setSemesterId(id)}
          />
        </Box>
        <Divider sx={{ width: '714px' }} />
        <Typography sx={{ padding: '16px 0' }}>Викладачі</Typography>
        {disciplineTeachers.map(teacher => (
          <Box key={teacher.id} sx={styles.teacherRow}>
            <Dropdown
              options={teachersOptions.filter(
                t =>
                  !disciplineTeachers.map(({ id }) => id).includes(t.id) ||
                  t.id === teacher.id,
              )}
              value={teacher.id}
              size={FieldSize.MEDIUM}
              width="360px"
              label=""
              placeholder="Викладач"
              disableClearable
              onChange={id => handleTeacherChange(id)}
            />
            <CheckboxesDropdown
              sx={styles.checkboxDropdown}
              values={rolesOptions}
              selected={teacher.disciplineTypes.map(discipline => ({
                value: discipline,
                label: discipline,
                id: rolesData.indexOf(discipline).toString(),
              }))}
              size={FieldSize.MEDIUM}
              label="Тег"
              handleChange={e => handleRolesChange(e, teacher)}
              menuSx={{
                width: '200px',
                minWidth: '0 !important',
              }}
            />
            <IconButton
              style={{ width: '46px', height: '46px', flexShrink: '0' }}
              icon={<TrashIcon />}
              shape={IconButtonShape.CIRCLE}
              size={IconButtonSize.MEDIUM}
              color={IconButtonColor.ERROR}
              onClick={() => deleteTeacher(teacher.id)}
            />
          </Box>
        ))}

        {!isEditingTeachers && (
          <Button
            sx={{ width: '120px', borderRadius: '8px' }}
            text="Додати"
            variant={ButtonVariant.OUTLINE}
            size={ButtonSize.SMALL}
            startIcon={<PlusIcon className="icon" />}
            type="submit"
            onClick={() => addNewTeacher()}
          />
        )}
      </Box>
    </Box>
  );
};

export default AdminSubjectCreate;
