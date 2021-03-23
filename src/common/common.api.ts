import { FindManyOptions, ILike, Like } from "typeorm";
import { PageableQueryDto } from "./common.dto";

type PageableQuery = {
  skip?: number;
  take?: number;
}

export class ResponseEntity<T> {
  static of<T>(obj: T) {
    const response = new ResponseEntity<T>();
    Object.assign(response, obj);
    return response;
  }

  static async ofAsync<T>(obj: Promise<T>) {
    return ResponseEntity.of<T>(await obj);
  }
};

export type SortDirection = 'ASC' | 'DESC';

export type SortableMapEntry = [direction: 'ASC' | 'DESC', mapTo?: string];

export type SortableMap = {
  [value: string]: SortableMapEntry;
}

export class SortableProcessor<T extends SortableMap> {
  map: SortableMap;
  defaultKey?: keyof T;

  toQuery(value: string) {
    if (value == null || this.map[value] == null) {
      if (!this.defaultKey) {
        return {};
      }

      value = this.defaultKey as string;
    }

    const entry = this.map[value];

    return {
      [entry[1] ?? value]: entry[0],
    };
  }

  static of <T extends SortableMap>(map: T, defaultKey?: keyof T) {
    const sortable = new SortableProcessor<T>();

    sortable.map = map;
    sortable.defaultKey = defaultKey;

    return sortable;
  }
};

export class Pageable {
  page: number;
  size: number;

  toQuery(): PageableQuery {
    if (this.page == null || this.size == null) { return {}; }

    return {
      skip: this.page * this.size,
      take: this.size,
    };
  }

  static of(page: number, pageSize: number): Pageable {
    const pageable = new Pageable();

    pageable.page = page;
    pageable.size = pageSize;

    return pageable;
  }

  static from(query: PageableQueryDto): Pageable {
    return Pageable.of(query.page, query.pageSize);
  }
};

export class Searchable<T> {
  value: string;
  field: keyof T;

  toQuery(): Partial<FindManyOptions<T>> {
    if (this.value == null || this.value == '') { return {}; }
    
    return {
      [this.field]: ILike(`%${this.value.replace('%', '')}%`),
    };
  }

  static of<T = any>(field: keyof T, value: string): Searchable<T> {
    const searchable = new Searchable<T>();

    searchable.value = value;
    searchable.field = field;

    return searchable;
  }
};

export class Page<T> {
  count: number;
  items: T[];

  static of<T>(count: number, data: T[]): Page<T> {
    const page = new Page<T>();

    page.count = count;
    page.items = data;

    return page;
  }
};
