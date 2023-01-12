export interface PageQuery {
  page?: number;
  page_size?: number;
};

export interface SearchQuery {
  search?: string;
  all?: boolean;
};

export interface SortQuery<T = string> {
  sort?: T;
};

