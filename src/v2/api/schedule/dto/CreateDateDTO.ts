import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class CreateDateDTO {
  @IsNotEmpty(validationOptionsMsg('startDate can not be empty'))
  @Type(() => Date)
    startDate: Date;

  @IsNotEmpty(validationOptionsMsg('endDate can not be empty'))
  @Type(() => Date)
    endDate: Date;
}