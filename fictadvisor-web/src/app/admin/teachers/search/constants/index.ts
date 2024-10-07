import { DisciplineTypeEnum, SortQATParam } from '@fictadvisor/utils/enums';
import { QueryAllTeacherDTO } from '@fictadvisor/utils/requests';

export const initialValues: QueryAllTeacherDTO = {
  search: '',
  sort: SortQATParam.LAST_NAME,
  order: 'asc',
  cathedrasId: [],
};

export const teacherRoles: DisciplineTypeEnum[] = [
  DisciplineTypeEnum.LECTURE,
  DisciplineTypeEnum.PRACTICE,
  DisciplineTypeEnum.LABORATORY,
  DisciplineTypeEnum.EXAM,
  DisciplineTypeEnum.CONSULTATION,
  DisciplineTypeEnum.WORKOUT,
];
