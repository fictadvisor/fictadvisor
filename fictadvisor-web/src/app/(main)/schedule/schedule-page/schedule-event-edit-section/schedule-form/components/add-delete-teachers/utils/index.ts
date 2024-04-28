import {
  PaginatedTeachersResponse,
  ShortDisciplinesResponse,
} from '@fictadvisor/utils/responses';

import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

export const getTeacherOptions = (
  data: PaginatedTeachersResponse,
): DropDownOption[] => {
  return data.teachers.map(teacher => ({
    id: teacher.id,
    label: `${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`,
  }));
};

export const getDisciplineOptions = (
  data: ShortDisciplinesResponse,
): DropDownOption[] => {
  return data.disciplines.map(discipline => ({
    id: discipline.id,
    label: discipline.subject.name,
  }));
};
