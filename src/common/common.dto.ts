import { Expose, Transform } from "class-transformer";
import { IsOptional } from "class-validator";

export interface Mapped<Entity, DtoClass> {
  toDto(entity: Entity): DtoClass;
};

const transformIntValue = (field) => {
  const { value } = field;
  const num = parseInt(value, 10);
  return Number.isSafeInteger(num) ? num : null;
};

export const TransformInt = () => Transform(transformIntValue);

export class PageableQueryDto {
  @IsOptional()
  @TransformInt()
  page?: number;

  @IsOptional()
  @TransformInt()
  @Expose({ name: 'page_size' })
  pageSize?: number;
}

export class SearchableQueryDto extends PageableQueryDto {
  @IsOptional()
  @Expose({ name: 'search' })
  searchQuery?: string;

  @IsOptional()
  @Expose({ name: 'sort' })
  sort: string;
};
