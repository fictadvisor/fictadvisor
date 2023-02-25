import { IsBoolean, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';
import { Type } from 'class-transformer';

export class FullLessonDTO {
  @IsNotEmpty(validationOptionsMsg('ID can\'t be empty'))
    id: string;

  @IsObject()
    subject: {
    id: string;
    name: string
  };

  @IsObject()
    teachers: {
    id: string;
    name: string
  }[];

  @IsNotEmpty(validationOptionsMsg('Lesson type can\'t be empty'))
    type: string;

  @IsOptional()
    homework?: string;

  @IsOptional()
    comment?: string;

  @IsOptional()
    isTest?: boolean;

  @IsNotEmpty(validationOptionsMsg('URL can\'t be empty'))
    url: string;

  @IsNotEmpty(validationOptionsMsg('Resources can\'t be empty'))
    resources: string;

  @IsNotEmpty(validationOptionsMsg('Evaluating system can\'t be empty'))
    evaluatingSystem: string;

  @IsBoolean()
    isSelective: boolean;

  @IsNotEmpty(validationOptionsMsg('startDate can not be empty'))
  @Type(() => Date)
    startDate: Date;

  @IsNotEmpty(validationOptionsMsg('endDate can not be empty'))
  @Type(() => Date)
    endDate: Date;
}