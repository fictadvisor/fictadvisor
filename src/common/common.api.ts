import { ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";
import { Like } from "typeorm";

export const Common = () => UseInterceptors(ClassSerializerInterceptor);

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

  static of(page: number, size: number) {
    const pageable = new Pageable();

    pageable.page = page;
    pageable.size = size;

    return pageable;
  }
};

export class Searchable<T> {
  value: string;
  field: keyof T;

  toQuery() {
    if (this.value == null) { return {}; }
    
    return {
      [this.field]: Like(`%${this.value}%`),
    };
  }

  static of<T = any>(field: keyof T, value: string) {
    const searchable = new Searchable<T>();

    searchable.value = value;
    searchable.field = field;

    return searchable;
  }
};

export interface Page<T> {
  count: number;
  data: T[];
};