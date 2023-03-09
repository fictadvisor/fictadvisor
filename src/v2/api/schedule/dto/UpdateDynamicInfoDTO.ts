import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';
import { Type } from 'class-transformer';

export class UpdateDynamicInfoDTO {
  @IsNotEmpty(validationOptionsMsg('Evaluating system can\'t be empty'))
    homework?: string;

  @IsNotEmpty(validationOptionsMsg('Evaluating system can\'t be empty'))
    url?: string;

  @IsNotEmpty(validationOptionsMsg('Evaluating system can\'t be empty'))
    teacherId?: string;

  @IsNotEmpty(validationOptionsMsg('startDate can not be empty'))
  @Type(() => Date)
    startDate?: Date;

  @IsNotEmpty(validationOptionsMsg('endDate can not be empty'))
  @Type(() => Date)
    endDate?: Date;
}