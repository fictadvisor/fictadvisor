import { useQuery } from '@tanstack/react-query';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import { CheckboxesDropdownOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxesDropdown';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import DatesAPI from '@/lib/api/dates/DatesAPI';
import GroupAPI from '@/lib/api/group/GroupAPI';
import SubjectAPI from '@/lib/api/subject/SubjectAPI';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

import { rolesData, rolesText } from '../constants';

export function useDisciplines() {
  let subjectOptions;
  let groupsOptions;
  let semesterOptions;
  let teachersOptions: DropDownOption[] = [];
  const rolesOptions: CheckboxesDropdownOption[] = rolesData.map(role => ({
    label: rolesText[role],
    value: rolesText[role],
    id: role,
  }));
  const {
    data: semesterData,
    isLoading: isLoadingSemesters,
    error: errorSemesters,
  } = useQuery({
    queryKey: ['dates'],
    queryFn: () => DatesAPI.getDates(),
    ...useQueryAdminOptions,
  });
  const {
    data: groupsData,
    isLoading: isLoadingGroups,
    error: errorGroups,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: () => GroupAPI.getAll(),
    ...useQueryAdminOptions,
  });
  const {
    data: subjectsData,
    isLoading: isLoadingSubjects,
    error: errorSubjects,
  } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => SubjectAPI.getAll(),
    ...useQueryAdminOptions,
  });
  const {
    data: teachersData,
    isLoading: isLoadingTeachers,
    error: errorTeachers,
  } = useQuery({
    queryKey: ['teachers'],
    queryFn: () => TeacherAPI.getAll(),
    ...useQueryAdminOptions,
  });

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

  const isError = !!(
    errorGroups ||
    errorSubjects ||
    errorTeachers ||
    errorSemesters
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
    isError,
  };
}
