'use client';
import { type FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import { isAxiosError } from 'axios';

import Button from '@/components/common/ui/button-mui';
import {
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
} from '@/components/common/ui/icon-button';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import DatesAPI from '@/lib/api/dates/DatesAPI';
import DisciplineAPI from '@/lib/api/discipline/DisciplineAPI';
import AddDiscipline from '@/lib/api/discipline/types/AddDiscipline';
import GroupAPI from '@/lib/api/group/GroupAPI';
import SubjectAPI from '@/lib/api/subject/SubjectAPI';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import { AdminDiscipline } from '@/types/discipline';
import { DisciplineTeacher, TeacherRole } from '@/types/teacher';

import { disciplineTeacherInitialValues } from '../../../../components/disciplines-admin-search/constants';

import * as styles from './DisciplinesInfoSection.styles';

interface DisciplinesInfoSectionProps {
  discipline: AdminDiscipline;
  onEditSubmit: (values: AddDiscipline) => void;
}

const rolesData = ['LECTURER', 'LABORANT', 'PRACTICIAN', 'EXAMINER', 'OTHER'];
const rolesRepres = ['Лектор', 'Лаборант', 'Практик', 'Екзаменатор', 'Інше'];

const DisciplinesInfoSection: FC<DisciplinesInfoSectionProps> = ({
  discipline,
  onEditSubmit,
}) => {
  const [semesterId, setSemesterId] = useState<string>();
  const [groupId, setGroupId] = useState<string>();
  const [subjectId, setSubjectId] = useState<string>();
  const [disciplineTeachers, setDisciplineTeachers] =
    useState<DisciplineTeacher[]>();
  const [groups, setGroups] = useState<DropDownOption[]>();
  const [semesters, setSemesters] = useState<DropDownOption[]>();
  const [teachers, setTeachers] = useState<DropDownOption[]>();
  const [subjects, setSubjects] = useState<DropDownOption[]>();
  const toastError = useToastError();

  useEffect(() => {
    onEditSubmit({
      groupId: groupId as string,
      semester: parseInt(semesterId?.split(' ')[1] as string),
      year: parseInt(semesterId?.split(' ')[0] as string),
      subjectId: subjectId as string,
      teachers: disciplineTeachers?.map(teacher => ({
        teacherId: teacher.id,
        roleNames: teacher.roles.map(
          role => rolesData[rolesRepres.indexOf(role)],
        ),
      })),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semesterId, groupId, subjectId, disciplineTeachers]);

  const { data: semesterData } = useQuery(
    'semester',
    () => DatesAPI.getDates(),
    {
      onError: error => {
        if (isAxiosError(error)) {
          toastError.displayError(error.response?.data.message);
        }
      },
      onSuccess(data) {
        setSemesters(
          data.semesters.map(semester => ({
            id: `${semester.year.toString()} ${semester.semester.toString()}`,
            label: `${semester.semester} семестр ${semester.year}-${
              semester.year + 1
            }`,
          })),
        );
        if (!semesterId) {
          setSemesterId(
            `${discipline.year.toString()} ${discipline.semester.toString()}`,
          );
        }
      },
    },
  );
  const { data: groupsData } = useQuery('group', () => GroupAPI.getAll(), {
    onError: error => {
      if (isAxiosError(error)) {
        toastError.displayError(error.response?.data.message);
      }
    },
    onSuccess(data) {
      setGroups(
        data.groups.map(group => ({
          id: group.id,
          label: group.code,
        })),
      );
      if (!groupId) {
        setGroupId(discipline.group.id);
      }
    },
  });
  const { data: subjectsData } = useQuery(
    'subject',
    () => SubjectAPI.getAll(),
    {
      onError: error => {
        if (isAxiosError(error)) {
          toastError.displayError(error.response?.data.message);
        }
      },
      onSuccess(data) {
        setSubjects(
          data.subjects.map(subject => ({
            id: subject.id,
            label: subject.name,
          })),
        );
        if (!subjectId) {
          setSubjectId(data.subjects.find(x => x.name == discipline.name)?.id);
        }
      },
    },
  );
  const { data: teachersData } = useQuery(
    'teacher',
    () => TeacherAPI.getAdminAll(),
    {
      onError: error => {
        if (isAxiosError(error)) {
          toastError.displayError(error.response?.data.message);
        }
      },
      onSuccess(data) {
        setTeachers(
          data.teachers
            .map(teacher => ({
              id: teacher.id,
              label: `${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`,
            }))
            .filter(x => x.label.split(' ')[0].length != 0),
        );
      },
    },
  );
  const { data: disciplineTeachersData } = useQuery(
    'allDisciplineTeachers',
    () => DisciplineAPI.getAllDisciplineTeachers(discipline.id),
    {
      onError: error => {
        if (isAxiosError(error)) {
          toastError.displayError(error.response?.data.message);
        }
      },
      onSuccess(data) {
        if (!disciplineTeachers) {
          setDisciplineTeachers(
            data.teachers.map(teacher => ({
              ...teacher,
              roles: teacher.roles.map(
                role => rolesRepres[rolesData.indexOf(role)],
              ),
            })) as DisciplineTeacher[],
          );
        }
      },
    },
  );

  if (
    !semesterData ||
    !groupsData ||
    !teachersData ||
    !subjectsData ||
    !disciplineTeachersData
  ) {
    return <>Is Loading...</>;
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
    if (disciplineTeachers && teachersData) {
      const tmpTeacher = teachersData.teachers.find(
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

  const addNewTeacher = async () => {
    const tmpTeacher: DisciplineTeacher = disciplineTeacherInitialValues;
    if (disciplineTeachers) {
      setDisciplineTeachers([...disciplineTeachers, tmpTeacher]);
    }
  };

  return (
    <Box sx={styles.page}>
      <Box sx={styles.mainInfo}>
        <Dropdown
          options={subjects as DropDownOption[]}
          value={subjectId as string}
          size={FieldSize.MEDIUM}
          label="Предмет"
          placeholder="Предмет"
          disableClearable={true}
          onChange={(id: string) => setSubjectId(id)}
        />
        <Dropdown
          options={groups as DropDownOption[]}
          value={groupId as string}
          size={FieldSize.MEDIUM}
          label="Група"
          placeholder="Група"
          disableClearable={true}
          onChange={(id: string) => setGroupId(id)}
        />
        <Dropdown
          options={semesters as DropDownOption[]}
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
        return disciplineTeachers.length > 1 ? (
          <Box sx={styles.teacherRow}>
            <Dropdown
              options={teachers as DropDownOption[]}
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
              color={IconButtonColor.ERROR}
              onClick={() => deleteTeacher(index)}
            />
          </Box>
        ) : (
          <Box sx={styles.teacherRow}>
            <Dropdown
              options={teachers as DropDownOption[]}
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
