import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { DisciplineTypeEnum } from '@prisma/client';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class AttachLessonDTO {
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Discipline id cannot be empty'))
    disciplineId: string;

  @ApiProperty()
  @IsArray(validationOptionsMsg('Teachers must be Array'))
  @IsNotEmpty(validationOptionsMsg('Teachers cannot be empty (empty array is required)'))
    teachers: string[];

  @ApiProperty({
    enum: DisciplineTypeEnum,
  })
  @IsEnum(DisciplineTypeEnum, validationOptionsMsg('Discipline type must be an enum'))
  @IsNotEmpty()
    disciplineType: DisciplineTypeEnum;

  @ApiPropertyOptional()
  @MaxLength(2000, validationOptionsMsg('Discipline description is too long (max: 2000)'))
  @IsOptional()
    disciplineInfo?: string;
}