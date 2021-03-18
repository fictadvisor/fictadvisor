import { Expose, Transform } from "class-transformer";
import { IsOptional } from "class-validator";

export interface Mapped<Entity, DtoClass> {
  toDto(entity: Entity): DtoClass;
};

const transformIntValue = (value) => {
  const num = parseInt(value, 10);
  return Number.isSafeInteger(num) ? num : null;
};

export const TransformInt = () => Transform(transformIntValue);

export class SearchableQueryDto {
  @IsOptional()
  @TransformInt()
  @Expose({ name: 'p' })
  page: number;

  @IsOptional()
  @TransformInt()
  @Expose({ name: 's' })
  pageSize: number;

  @IsOptional()
  @Expose({ name: 'q' })
  searchQuery: string;
};
