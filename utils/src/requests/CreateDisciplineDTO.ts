import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { validationOptionsMsg } from '../ValidationUtil';
import { DisciplineTypeEnum } from '../enums';

class Discipline_DisciplineTeacher {
  @ApiProperty({
    description: 'Teacher\'s id',
  })
  @IsNotEmpty(validationOptionsMsg('Teacher id can not be empty'))
  @IsUUID('4', validationOptionsMsg('Teacher id should be uuid'))
    teacherId: string;

  @ApiProperty({
    description: 'Array of discipline types of discipline teacher',
    type: [DisciplineTypeEnum],
    enum: DisciplineTypeEnum,
  })
  @IsEnum(DisciplineTypeEnum, validationOptionsMsg('Each discipline type in array should be an enum', true))
  @IsArray(validationOptionsMsg('Discipline types should be an array'))
    disciplineTypes: DisciplineTypeEnum[];
}

export class CreateDisciplineDTO {
  @ApiProperty({
    description: 'Group Id to bind discipline',
  })
  @IsNotEmpty(validationOptionsMsg('Group id can not be empty'))
    groupId: string;

  @ApiProperty({
    description: 'Subject id to create discipline',
  })
  @IsNotEmpty(validationOptionsMsg('Subject id can not be empty'))
    subjectId: string;

  @ApiProperty({
    description: 'Semester number',
  })
  @IsNumber()
    semester: number;

  @ApiProperty({
    description: 'Year number',
  })
  @IsNumber()
    year: number;

  @ApiPropertyOptional({
    description: 'Whether discipline is selective or not',
    default: false,
  })
  @IsOptional()
    isSelective?: boolean;

  @ApiPropertyOptional({
    description: 'Some discipline description',
    default: '',
  })
  @IsOptional()
    description?: string;

  @ApiPropertyOptional({
    description: 'Add discipline teachers for this discipline',
    type: [Discipline_DisciplineTeacher],
  })
  @IsArray(validationOptionsMsg('Discipline teachers should be an array'))
  @ValidateNested(validationOptionsMsg('Each element of array should be a DisciplineTeacher', true))
  @Type(() => Discipline_DisciplineTeacher)
    teachers: Discipline_DisciplineTeacher[];
}
