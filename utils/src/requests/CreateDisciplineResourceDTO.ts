import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDisciplineResourceDTO {
  @ApiProperty({
    description: 'Name of the resource',
  })
  @IsString(validationOptionsMsg('Name must be string'))
  @IsNotEmpty(validationOptionsMsg('Name cannot be empty'))
    name: string;

  @ApiPropertyOptional({
    description: 'Description of the resource',
  })
  @IsString(validationOptionsMsg('Description must be string'))
  @IsOptional()
    description?: string;

  @ApiProperty({
    description: 'Link to the resource',
  })
  @IsString(validationOptionsMsg('Link must be string'))
  @IsNotEmpty(validationOptionsMsg('Link cannot be empty'))
    link: string;

  @ApiProperty({
    description: 'Id of specific subject',
  })
  @IsUUID(undefined, validationOptionsMsg('Subject id must be UUID'))
  @IsNotEmpty(validationOptionsMsg('Subject id cannot be empty'))
    subjectId: string;

  @ApiProperty({
    description: 'Id of specific teacher',
  })
  @IsUUID(undefined, validationOptionsMsg('Teacher id must be UUID'))
  @IsNotEmpty(validationOptionsMsg('Teacher id cannot be empty'))
    teacherId: string;

  @ApiPropertyOptional({
    description: 'Array of resource category id\'s',
  })
  @IsOptional()
  @IsArray(validationOptionsMsg('Category id\'s must be an array'))
    categoryIds?: string[];

  @ApiProperty({
    description: 'Resource year',
  })
  @IsNumber({}, validationOptionsMsg('Year must be number'))
  @IsNotEmpty(validationOptionsMsg('Year cannot be empty'))
    year: number;

  @ApiProperty({
    description: 'Resource semester',
  })
  @IsNumber({}, validationOptionsMsg('Semester must be number'))
  @IsNotEmpty(validationOptionsMsg('Semester cannot be empty'))
    semester: number;
}