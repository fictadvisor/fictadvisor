export interface SortDTO<T>{
  sort?: {
   [k in keyof T]: 'asc' | 'desc';
  }
}

export interface Sort<T> {
  orderBy: {
    [k in keyof T]: 'asc' | 'desc';
  }
}