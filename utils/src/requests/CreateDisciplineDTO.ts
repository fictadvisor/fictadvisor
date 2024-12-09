import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { validationOptionsMsg } from '../ValidationUtil';
import { DisciplineTypeEnum } from '../enums';

class Discipline_DisciplineTeacher {
  @ApiProperty({
    description: 'Teacher\'s id',
  })
  @IsNotEmpty(validationOptionsMsg('Teacher id can not be empty'))
  @IsUUID('4', validationOptionsMsg('Teacher id must be uuid'))
    teacherId: string;

  @ApiProperty({
    description: 'Array of discipline types of discipline teacher',
    type: [DisciplineTypeEnum],
    enum: DisciplineTypeEnum,
  })
  @IsEnum(DisciplineTypeEnum, validationOptionsMsg('Each discipline type in array must be an enum', true))
  @IsArray(validationOptionsMsg('Discipline types must be an array'))
    disciplineTypes: DisciplineTypeEnum[];
}

export class CreateDisciplineDTO {
  @ApiProperty({
    description: 'Group Id to bind discipline',
  })
  @IsNotEmpty(validationOptionsMsg('Group id can not be empty'))
  @IsUUID('4', validationOptionsMsg('Group id must be a uuid'))
    groupId: string;

  @ApiProperty({
    description: 'Subject id to create discipline',
  })
  @IsNotEmpty(validationOptionsMsg('Subject id can not be empty'))
  @IsUUID('4', validationOptionsMsg('Subject id must be a uuid'))
    subjectId: string;

  @ApiProperty({
    description: 'Semester number',
  })
  @IsNotEmpty(validationOptionsMsg('Semester can not be empty'))
  @IsNumber({}, validationOptionsMsg('Semester must be a number'))
    semester: number;

  @ApiProperty({
    description: 'Year number',
  })
  @IsNotEmpty(validationOptionsMsg('Year can not be empty'))
  @IsNumber({}, validationOptionsMsg('Year must be a number'))
    year: number;

  @ApiPropertyOptional({
    description: 'Whether discipline is selective or not',
    default: false,
  })
  @IsOptional()
  @IsBoolean(validationOptionsMsg('isSelective must be a boolean'))
    isSelective?: boolean;

  @ApiPropertyOptional({
    description: 'Some discipline description',
    default: '',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Description must be a string'))
    description?: string;

  @ApiPropertyOptional({
    description: 'Add discipline teachers for this discipline',
    type: [Discipline_DisciplineTeacher],
  })
  @IsArray(validationOptionsMsg('Discipline teachers must be an array'))
  @ValidateNested(validationOptionsMsg('Each element of array must be a DisciplineTeacher', true))
  @Type(() => Discipline_DisciplineTeacher)
    teachers: Discipline_DisciplineTeacher[];
}
