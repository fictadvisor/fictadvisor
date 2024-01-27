import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsIn, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { validationOptionsMsg } from '../../../v2/utils/GLOBALS';
import { QueryAllDTO } from '../../../v2/utils/QueryAllDTO';
import { OrderQAParam } from './OrderQAParam';
import { SortQAGroupParam } from './SortQAGroupParam';

export class QueryAllGroupDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    description: 'Accepts group code',
  })
  @IsOptional()
    search?: string;

  @ApiPropertyOptional({
    description: 'Array of specialty ids',
  })
  @IsArray(validationOptionsMsg('Specialities must be an array'))
  @IsOptional()
    specialities?: string[];
  
  @ApiPropertyOptional({
    description: 'Array of cathedra ids',
  })
  @IsArray(validationOptionsMsg('Cathedras must be an array'))
  @IsOptional()
    cathedras?: string[];
  
  @ApiPropertyOptional({
    description: 'Array of courses',
    type: [Number],
  })
  @Type(() => Number)
  @IsArray(validationOptionsMsg('Courses must be an array'))
  @IsNumber({}, validationOptionsMsg('Each course must be a number', true))
  @Min(1, validationOptionsMsg('Min course value is 1', true))
  @Max(4, validationOptionsMsg('Max course value is 4', true))
  @IsOptional()
    courses?: number[];
  
  @ApiPropertyOptional({
    enum: SortQAGroupParam,
  })
  @IsEnum(SortQAGroupParam, validationOptionsMsg('Cathedras must be an array'))
  @IsOptional()
    sort?: SortQAGroupParam;

  @ApiPropertyOptional({
    enum: OrderQAParam,
    description: 'Ascending by default',
  })
  @IsIn(['asc', 'desc'], {
    message: 'Wrong value for order',
  })
  @IsOptional()
    order?: 'asc' | 'desc';
}