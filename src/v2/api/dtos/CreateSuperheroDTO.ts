import { IsBoolean } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class CreateSuperheroDTO {
  @IsBoolean(validationOptionsMsg('Dorm is not a number'))
    dorm: boolean;
}