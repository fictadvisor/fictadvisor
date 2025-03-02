import { PaginationDataResponse } from '@fictadvisor/utils/dist/responses';

export class PaginatedData<T=object> {
  data: T[];
  pagination: PaginationDataResponse;
}
