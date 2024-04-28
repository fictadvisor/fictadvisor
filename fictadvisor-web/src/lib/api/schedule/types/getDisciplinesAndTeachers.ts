import {
  PaginatedTeachersResponse,
  ShortDisciplinesResponse,
} from '@fictadvisor/utils/responses';

export interface getDisciplinesAndTeachers {
  disciplines: ShortDisciplinesResponse;
  teachers: PaginatedTeachersResponse;
}
