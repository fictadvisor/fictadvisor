import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { validationOptionsMsg } from '../ValidationUtil';
import { QueryAllDTO } from './QueryAllDTO';
import { SortQAGrantsParam } from '../enums/params/SortQAGrantsParam';

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
  @Transform(({ value }) => value === 'true')
  @IsBoolean(validationOptionsMsg('Set must be an boolean'))
    set?: boolean;
}
