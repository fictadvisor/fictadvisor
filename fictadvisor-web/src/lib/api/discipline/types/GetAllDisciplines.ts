import { Pagination } from '@/types/api';
import { AdminDiscipline } from '@/types/discipline';

export default interface GetAllDisciplines {
  disciplines: AdminDiscipline[];
  pagination: Pagination;
}
