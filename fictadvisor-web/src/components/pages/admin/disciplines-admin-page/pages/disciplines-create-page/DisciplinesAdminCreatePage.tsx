'use client';
import { type FC, useRef, useState } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Box, Stack, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Divider from '@/components/common/ui/divider';
import { Dropdown } from '@/components/common/ui/form';
import CheckboxesDropdown from '@/components/common/ui/form/checkboxes-dropdown/CheckboxesDropdown';
import { CheckboxesDropdownOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxesDropdown';
import { FieldSize } from '@/components/common/ui/form/common/types';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import {
  IconButton,
  IconButtonColor,
  IconButtonShape,
  IconButtonSize,
} from '@/components/common/ui/icon-button';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import DatesAPI from '@/lib/api/dates/DatesAPI';
import { GetDates } from '@/lib/api/dates/types/GetDates';
import DisciplineAPI from '@/lib/api/discipline/DisciplineAPI';
import GroupAPI from '@/lib/api/group/GroupAPI';
import { GetAllGroupsResponse } from '@/lib/api/group/types/GetAllGroupsResponse';
import SubjectAPI from '@/lib/api/subject/SubjectAPI';
import { GetListOfSubjectsResponse } from '@/lib/api/subject/types/GetListOfSubjectsResponse';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import { GetTeachersResponse } from '@/lib/api/teacher/types/GetTeachersResponse';
import { Group } from '@/types/group';
import { DisciplineTeacher, TeacherRole } from '@/types/teacher';

import { disciplineTeacherInitialValues } from '../../components/disciplines-admin-search/constants';

import * as styles from './DisciplinesAdminCreatePage.styles';

interface InputData {
  semesterData: UseQueryResult<GetDates, unknown>;
  groupsData: UseQueryResult<GetAllGroupsResponse, unknown>;
  subjectsData: UseQueryResult<GetListOfSubjectsResponse, unknown>;
  teachersData: UseQueryResult<GetTeachersResponse, unknown>;
}

const rolesData = ['LECTURER', 'LABORANT', 'PRACTICIAN', 'EXAMINER', 'OTHER'];
const rolesRepres = ['Лектор', 'Лаборант', 'Практик', 'Екзаменатор', 'Інше'];

const DisciplinesAdminCreatePage: FC = () => {
  const [semesterId, setSemesterId] = useState<string>('');
  const [groupId, setGroupId] = useState<string>('');
  const [subjectId, setSubjectId] = useState<string>('');
  const [disciplineTeachers, setDisciplineTeachers] = useState<
    DisciplineTeacher[]
  >([disciplineTeacherInitialValues]);
  const groups = useRef<DropDownOption[]>();
  const semesters = useRef<DropDownOption[]>();
  const teachers = useRef<DropDownOption[]>();
  const subjects = useRef<DropDownOption[]>();
  const toast = useToast();
  const toastError = useToastError();
  const router = useRouter();

  const data: InputData = {
    semesterData: useQuery('semester', () => DatesAPI.getDates(), {
      onError: error => {
        if (isAxiosError(error)) {
          toastError.displayError(error.response?.data.message);
        }
      },
      onSuccess(data) {
        semesters.current = data.semesters.map(semester => ({
          id: `${semester.year.toString()} ${semester.semester.toString()}`,
          label: `${semester.semester} семестр ${semester.year}-${
            semester.year + 1
          }`,
        }));
      },
    }),
    groupsData: useQuery('group', () => GroupAPI.getAll(), {
      onError: error => {
        if (isAxiosError(error)) {
          toastError.displayError(error.response?.data.message);
        }
      },
      onSuccess(data) {
        groups.current = data.groups.map((group: Group) => ({
          id: group.id,
          label: group.code,
        }));
      },
    }),
    subjectsData: useQuery('subject', () => SubjectAPI.getAll(), {
      onError: error => {
        if (isAxiosError(error)) {
          toastError.displayError(error.response?.data.message);
        }
      },
      onSuccess(data) {
        subjects.current = data.subjects.map(subject => ({
          id: subject.id,
          label: subject.name,
        }));
      },
    }),
    teachersData: useQuery('teacher', () => TeacherAPI.getAdminAll(), {
      onError: error => {
        if (isAxiosError(error)) {
          toastError.displayError(error.response?.data.message);
        }
      },
      onSuccess(data) {
        teachers.current = data.teachers
          .map(teacher => ({
            id: teacher.id,
            label: `${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`,
          }))
          .filter(x => x.label.split(' ')[0].length != 0);
      },
    }),
  };

  if (
    !data.semesterData.data ||
    !data.groupsData.data ||
    !data.teachersData.data ||
    !data.subjectsData.data
  ) {
    return <Box sx={{ p: '16px' }}>Is Loading...</Box>;
  }

  const roles: CheckboxesDropdownOption[] = rolesRepres.map((role, index) => ({
    id: index.toString(),
    label: role,
    value: role,
  }));

  const deleteTeacher = (index: number) => {
    if (disciplineTeachers) {
      setDisciplineTeachers([
        ...disciplineTeachers.filter((discipline, i) => i != index),
      ]);
    }
  };

  const handleTeacherChange = (index: number, teacherId: string) => {
    if (disciplineTeachers && data.teachersData.data) {
      const tmpTeacher = data.teachersData.data.teachers.find(
        x => x.id == teacherId,
      ) as DisciplineTeacher;
      setDisciplineTeachers([
        ...disciplineTeachers.map((teacher, i) => {
          if (i == index) {
            tmpTeacher.roles = teacher.roles;
            return tmpTeacher;
          }
          return teacher;
        }),
      ]);
    }
  };

  const addNewTeacher = () => {
    const tmpTeacher: DisciplineTeacher = disciplineTeacherInitialValues;
    if (disciplineTeachers) {
      setDisciplineTeachers([...disciplineTeachers, tmpTeacher]);
    }
  };

  const handleRolesChange = (values: string, index: number) => {
    setDisciplineTeachers([
      ...(disciplineTeachers?.map((teacher, i) => {
        if (i == index) {
          const tmpTeacher = teacher;
          tmpTeacher.roles = values as unknown as TeacherRole[];
          return tmpTeacher;
        }
        return teacher;
      }) as DisciplineTeacher[]),
    ]);
  };

  const isValuesSet = () => {
    let isTeacherSet = true;
    disciplineTeachers.forEach(teacher => {
      if (!teacher.id || !teacher.roles.length) isTeacherSet = false;
    });
    if (subjectId == '' || semesterId == '' || groupId == '' || !isTeacherSet) {
      return false;
    }
    return true;
  };

  const saveDiscipline = () => {
    if (isValuesSet()) {
      DisciplineAPI.addDiscipline({
        groupId: groupId as string,
        semester: parseInt(semesterId?.split(' ')[1] as string),
        year: parseInt(semesterId?.split(' ')[0] as string),
        subjectId: subjectId as string,
        teachers: disciplineTeachers.map(teacher => ({
          teacherId: teacher.id,
          roleNames: teacher.roles.map(
            role => rolesData[rolesRepres.indexOf(role)],
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
    <Box sx={{ p: '16px', responsiveFontSizes: '34px' }}>
      <Box sx={styles.header}>
        <Box sx={styles.editName}>
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
            options={subjects.current as DropDownOption[]}
            value={subjectId as string}
            size={FieldSize.MEDIUM}
            label="Предмет"
            placeholder="Предмет"
            disableClearable={true}
            onChange={(id: string) => setSubjectId(id)}
          />
          <Dropdown
            options={groups.current as DropDownOption[]}
            value={groupId as string}
            size={FieldSize.MEDIUM}
            label="Група"
            placeholder="Група"
            disableClearable={true}
            onChange={(id: string) => setGroupId(id)}
          />
          <Dropdown
            options={semesters.current as DropDownOption[]}
            value={semesterId as string}
            size={FieldSize.MEDIUM}
            label="Семестр"
            placeholder="Семестр"
            disableClearable={true}
            onChange={(id: string) => setSemesterId(id)}
          />
        </Box>
        <Divider sx={{ width: '714px' }}></Divider>
        <Typography sx={{ padding: '16px 0' }}>Викладачі</Typography>
        {disciplineTeachers?.map((teacher, index) => {
          return disciplineTeachers?.length > 1 ? (
            <Box sx={styles.teacherRow}>
              <Dropdown
                options={teachers.current as DropDownOption[]}
                value={teacher.id}
                size={FieldSize.MEDIUM}
                width="360px"
                label=""
                placeholder="Викладач"
                disableClearable={true}
                onChange={id => handleTeacherChange(index, id)}
              />
              <CheckboxesDropdown
                sx={styles.checkboxDropdown}
                values={roles}
                selected={teacher.roles.map(role => ({
                  value: role,
                  label: role,
                  id: rolesData.indexOf(role).toString(),
                }))}
                size={FieldSize.MEDIUM}
                label="Тег"
                handleChange={values =>
                  handleRolesChange(values.target.value, index)
                }
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
                onClick={() => deleteTeacher(index)}
              />
            </Box>
          ) : (
            <Box sx={styles.teacherRow}>
              <Dropdown
                options={teachers.current as DropDownOption[]}
                value={teacher.id}
                size={FieldSize.MEDIUM}
                width="360px"
                label=""
                placeholder="Викладач"
                disableClearable={true}
                onChange={id => handleTeacherChange(index, id)}
              />
              <CheckboxesDropdown
                sx={styles.checkboxDropdown}
                values={roles}
                selected={teacher.roles.map(role => ({
                  value: role,
                  label: role,
                  id: rolesData.indexOf(role).toString(),
                }))}
                size={FieldSize.MEDIUM}
                label="Тег"
                handleChange={values =>
                  handleRolesChange(values.target.value, index)
                }
                menuSx={{
                  width: '200px',
                  minWidth: '0 !important',
                }}
              />
            </Box>
          );
        })}

        <Button
          sx={{ width: '120px', borderRadius: '8px' }}
          text="Додати"
          variant={ButtonVariant.OUTLINE}
          size={ButtonSize.SMALL}
          startIcon={<PlusIcon className="icon" />}
          type="submit"
          onClick={() => addNewTeacher()}
        />
      </Box>
    </Box>
  );
};

export default DisciplinesAdminCreatePage;
