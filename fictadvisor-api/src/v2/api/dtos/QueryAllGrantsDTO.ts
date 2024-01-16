import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { SortQAGParam } from './SortQAGParam';
import { Transform } from 'class-transformer';

export class QueryAllGrantsDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    enum: SortQAGParam,
    description: 'Sorting by field',
    default: SortQAGParam.PERMISSION,
  })
  @IsEnum(SortQAGParam, validationOptionsMsg('Sort must be an enum'))
  @IsOptional()
    sort?: SortQAGParam;

  @ApiPropertyOptional({
    description: 'Is permission set',
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean(validationOptionsMsg('Set must be an boolean'))
    set?: boolean;
}
