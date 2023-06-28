export class PaginatedData<T=object> {
  data: T[];
  meta: {
    pageSize: number;
    page: number;
    prevPageElems: number;
    nextPageElems: number;
  };
}