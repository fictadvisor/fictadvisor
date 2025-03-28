import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsIn, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';
import { OrderQAParam, SortQGSParam } from '../enums';

export class GroupStudentsQueryDTO {
  @ApiPropertyOptional({
    enum: SortQGSParam,
    description: 'Sort by option',
    default: null,
  })
  @IsEnum(SortQGSParam, validationOptionsMsg('Wrong value for sort'))
  @IsOptional()
    sort?: SortQGSParam;
  
  @ApiPropertyOptional({
    enum: OrderQAParam,
    description: 'Get result in ascending or descending order',
    default: OrderQAParam.ASC,
  })
  @IsIn(['asc', 'desc'], validationOptionsMsg('Wrong value for order'))
  @IsOptional()
    order?: 'asc' | 'desc';
}
