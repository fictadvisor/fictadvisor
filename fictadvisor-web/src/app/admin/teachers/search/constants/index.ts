import { SortQATParam, TeacherRole } from '@fictadvisor/utils/enums';
import { QueryAllTeacherDTO } from '@fictadvisor/utils/requests';

export const initialValues: QueryAllTeacherDTO = {
  search: '',
  sort: SortQATParam.LAST_NAME,
  order: 'asc',
  cathedrasId: [],
  roles: [],
};

export const teacherRoles: TeacherRole[] = [
  TeacherRole.LECTURER,
  TeacherRole.LABORANT,
  TeacherRole.PRACTICIAN,
  TeacherRole.EXAMINER,
  TeacherRole.OTHER,
];
