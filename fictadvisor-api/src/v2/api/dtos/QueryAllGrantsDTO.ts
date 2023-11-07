import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { SortQAGParam } from './SortQAGParam';

export class QueryAllGrantsDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    enum: SortQAGParam,
    description: 'Sorting by field',
    default: 'permission',
  })
  @IsEnum(SortQAGParam, validationOptionsMsg('Sort must be an enum'))
  @IsOptional()
    sort?: SortQAGParam;

  @ApiPropertyOptional({
    description: 'Set value for grants',
  })
  @IsOptional()
  @IsBoolean()
    set?: boolean;
}