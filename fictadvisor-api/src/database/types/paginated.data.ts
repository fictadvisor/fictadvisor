import { PaginationDataResponse } from '@fictadvisor/utils/responses';

export class PaginatedData<T=object> {
  data: T[];
  pagination: PaginationDataResponse;
}
