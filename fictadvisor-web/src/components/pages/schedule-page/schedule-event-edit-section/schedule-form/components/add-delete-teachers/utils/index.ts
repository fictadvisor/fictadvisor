import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { GetGroupDisciplines } from '@/lib/api/group/types/GetGroupDisciplines';
import { GetTeachersResponse } from '@/lib/api/teacher/types/GetTeachersResponse';

export const getTeacherOptions = (
  data: GetTeachersResponse,
): DropDownOption[] => {
  return data.teachers.map(teacher => ({
    id: teacher.id,
    label: `${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`,
  }));
};

export const getDisciplineOptions = (
  data: GetGroupDisciplines,
): DropDownOption[] => {
  return data.disciplines.map(discipline => ({
    id: discipline.id,
    label: discipline.subject.name,
  }));
};
