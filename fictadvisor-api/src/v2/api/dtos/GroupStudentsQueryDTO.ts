import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsIn, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { OrderQAParam } from './OrderQAParam';

export enum SortQGSParam {
  LAST_NAME='lastName',
  FIRST_NAME='firstName',
  MIDDLE_NAME='middleName',
}

export class GroupStudentsQueryDTO {
  @ApiPropertyOptional({
    enum: SortQGSParam,
    description: 'Sort by option',
    default: null,
  })
  @IsEnum(SortQGSParam, validationOptionsMsg('Wrong value for sort'))
  @IsOptional()
    sort?: string;
  
  @ApiPropertyOptional({
    enum: OrderQAParam,
    description: 'Get result in ascending or descending order',
    default: OrderQAParam.ASC,
  })
  @IsIn(['asc', 'desc'], validationOptionsMsg('Wrong value for order'))
  @IsOptional()
    order?: 'asc' | 'desc';
}