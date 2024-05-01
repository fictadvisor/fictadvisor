import { IsArray, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDisciplineResourceDTO {
  @ApiPropertyOptional({
    description: 'Name of the resource',
  })
  @IsString(validationOptionsMsg('Name must be string'))
  @IsOptional()
    name?: string;

  @ApiPropertyOptional({
    description: 'Description of the resource',
  })
  @IsString(validationOptionsMsg('Description must be string'))
  @IsOptional()
    description?: string;

  @ApiPropertyOptional({
    description: 'Link to the resource',
  })
  @IsString(validationOptionsMsg('Link must be string'))
  @IsOptional()
    link?: string;
  
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
    description: 'Array of resource category id\'s',
  })
  @IsOptional()
  @IsArray(validationOptionsMsg('Category id\'s must be an array'))
    categoryIds?: string[];
  
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