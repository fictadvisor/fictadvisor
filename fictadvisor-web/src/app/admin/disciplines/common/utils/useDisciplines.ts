import { useQuery } from 'react-query';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import { CheckboxesDropdownOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxesDropdown';
import DatesAPI from '@/lib/api/dates/DatesAPI';
import DisciplineAPI from '@/lib/api/discipline/DisciplineAPI';
import GroupAPI from '@/lib/api/group/GroupAPI';
import SubjectAPI from '@/lib/api/subject/SubjectAPI';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

import { rolesRepres } from '../constants';

export function useDisciplines() {
  let subjectOptions;
  let groupsOptions;
  let semesterOptions;
  let teachersOptions;
  const rolesOptions: CheckboxesDropdownOption[] = rolesRepres.map(role => ({
    label: role,
    value: role,
  }));
  const { data: semesterData, isLoading: isLoadingSemesters } = useQuery(
    ['dates'],
    () => DatesAPI.getDates(),
    useQueryAdminOptions,
  );
  const { data: groupsData, isLoading: isLoadingGroups } = useQuery(
    ['groups'],
    () => GroupAPI.getAll(),
    useQueryAdminOptions,
  );
  const { data: subjectsData, isLoading: isLoadingSubjects } = useQuery(
    ['subjects'],
    () => SubjectAPI.getAll(),
    useQueryAdminOptions,
  );
  const { data: teachersData, isLoading: isLoadingTeachers } = useQuery(
    ['teachers'],
    () => TeacherAPI.getAdminAll(),
    useQueryAdminOptions,
  );

  const isLoading =
    isLoadingSemesters ||
    isLoadingGroups ||
    isLoadingTeachers ||
    isLoadingSubjects;

  const dataIsSuccess = !!(
    subjectsData &&
    groupsData &&
    semesterData &&
    teachersData
  );

  if (dataIsSuccess) {
    subjectOptions = subjectsData.subjects.map(subject => ({
      id: subject.id,
      label: subject.name,
    }));

    groupsOptions = groupsData.groups.map(groups => ({
      id: groups.id,
      label: groups.code,
    }));

    semesterOptions = semesterData.semesters.map(semester => ({
      id: `${semester.year.toString()} ${semester.semester.toString()}`,
      label: `${semester.semester} семестр ${semester.year}-${
        semester.year + 1
      }`,
    }));

    teachersOptions = teachersData.teachers
      .map(teacher => ({
        id: teacher.id,
        label: `${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`,
      }))
      .filter(x => x.label.split(' ')[0].length != 0);
  }

  return {
    subjectOptions,
    groupsOptions,
    semesterOptions,
    teachersOptions,
    rolesOptions,
    isLoading,
  };
}
