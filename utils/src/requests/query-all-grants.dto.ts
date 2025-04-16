import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { Transform, Type } from "class-transformer";
import { validationOptionsMsg } from '../validation.util';
import { QueryAllDTO } from './query-all.dto';
import { SortQAGrantsParam } from '../enums';

export class QueryAllGrantsDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    enum: SortQAGrantsParam,
    description: 'Sorting by field',
    default: SortQAGrantsParam.PERMISSION,
  })
  @IsEnum(SortQAGrantsParam, validationOptionsMsg('Sort must be an enum'))
  @IsOptional()
    sort?: SortQAGrantsParam;

  @ApiPropertyOptional({
    description: 'Is permission set',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined) return;
    return value === 'true';
  })
    set?: boolean;
}
