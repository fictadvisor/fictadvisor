import { DisciplineTypeEnum, SortQATParam } from '@fictadvisor/utils/enums';
import { QueryAllTeachersDTO } from '@fictadvisor/utils/requests';

export const initialValues: QueryAllTeachersDTO = {
  search: '',
  sort: SortQATParam.LAST_NAME,
  order: 'asc',
  cathedrasId: [],
  disciplineTypes: [],
};

export const teacherRoles: DisciplineTypeEnum[] = [
  DisciplineTypeEnum.LECTURE,
  DisciplineTypeEnum.PRACTICE,
  DisciplineTypeEnum.LABORATORY,
  DisciplineTypeEnum.EXAM,
  DisciplineTypeEnum.CONSULTATION,
  DisciplineTypeEnum.WORKOUT,
];
