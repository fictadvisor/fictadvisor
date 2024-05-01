import { IsArray, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { QueryAllDTO } from './QueryAllDTO';
import { validationOptionsMsg } from '../ValidationUtil';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryAllDisciplineResourcesDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    description: 'Accepts a string for search',
  })
  @IsString(validationOptionsMsg('Search must be string'))
  @IsOptional()
    search?: string;

  @ApiPropertyOptional({
    description: 'Array of resource category id\'s',
  })
  @IsOptional()
  @IsArray(validationOptionsMsg('Category id\'s must be an array'))
    categoryIds?: string[];

  @ApiPropertyOptional({
    description: 'Id of specific subject',
  })
  @IsUUID(undefined, validationOptionsMsg('Subject id must be UUID'))
  @IsOptional()
    subjectId?: string;

  @ApiPropertyOptional({
    description: 'Id of specific teacher',
  })
  @IsUUID(undefined, validationOptionsMsg('Teacher id must be UUID'))
  @IsOptional()
    teacherId?: string;

  @ApiPropertyOptional({
    description: 'Resource year',
  })
  @IsNumber({}, validationOptionsMsg('Year must be number'))
  @IsOptional()
    year?: number;
  
  @ApiPropertyOptional({
    description: 'Resource semester',
  })
  @IsNumber({}, validationOptionsMsg('Semester must be number'))
  @IsOptional()
    semester?: number;
}