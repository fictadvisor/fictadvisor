export class QueryAllDTO {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export class SortDTO {
  sort?: string;
  order?: 'asc' | 'desc';
}

export class SearchDTO {
  search?: string;
}

export class PageDTO {
  page?: number;
  pageSize?: number;
}

export class Page {
  take: number;
  skip: number;
}


export class Search<T> {
  OR: {
    [k in keyof T]: {
      contains: string;
      mode: 'default' | 'insensitive';
    }
  }[];
}

export class Sort {
  orderBy: {
    [k: string]: 'asc' | 'desc';
  };
}