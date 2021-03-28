export interface PageQuery {
  page?: number;
  page_size?: number;
};

export interface SearchQuery {
  search?: string;
};

export interface SortQuery<T = string> {
  sort?: T;
};

