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

  @Type(() => Date)
    startDate?: Date;

  @Type(() => Date)
    endDate?: Date;
}