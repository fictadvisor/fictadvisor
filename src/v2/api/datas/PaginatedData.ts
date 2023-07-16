export class PaginatedData<T=object> {
  data: T[];
  pagination: {
    pageSize: number;
    page: number;
    totalPages: number;
    prevPageElems: number;
    nextPageElems: number;
  };
}