import { validationOptionsMsg } from '../../utils/GLOBALS';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class VerifySuperheroDTO {
  @IsNotEmpty(validationOptionsMsg('id can not be empty'))
    id: string;

  @IsNumber()
    telegramId: number;

  @IsNotEmpty(validationOptionsMsg('firstName can not be empty'))
    firstName: string;

  @IsNotEmpty(validationOptionsMsg('middleName can not be empty'))
    middleName: string;

  @IsNotEmpty(validationOptionsMsg('lastName can not be empty'))
    lastName: string;

  @IsNotEmpty(validationOptionsMsg('groupCode can not be empty'))
    groupCode: string;

  @IsBoolean()
    dorm: boolean;
}