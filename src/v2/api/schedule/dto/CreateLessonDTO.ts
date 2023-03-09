import { DisciplineTypeEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class CreateLessonDTO {
  @IsOptional()
    fortnight?: number;

  @IsNotEmpty(validationOptionsMsg('startDate can not be empty'))
  @Type(() => Date)
    startDate: Date;

  @IsNotEmpty(validationOptionsMsg('endDate can not be empty'))
  @Type(() => Date)
    endDate: Date;

  @IsNotEmpty(validationOptionsMsg('Discipline ID can\'t be empty'))
    disciplineId: string;
  @IsNotEmpty(validationOptionsMsg('Teacher ID can\'t be empty'))
    teacherId: string;

  @IsEnum(DisciplineTypeEnum)
    type: DisciplineTypeEnum;
}