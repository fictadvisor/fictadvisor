import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class CreateResourceDTO {
  @MinLength(3, validationOptionsMsg('name is too short (min: 3)'))
  @MaxLength(50, validationOptionsMsg('name is too long (max: 50)'))
  @IsNotEmpty(validationOptionsMsg('name can not be empty'))
    name: string;

  @IsNotEmpty(validationOptionsMsg('link can not be empty'))
    link: string;

  @IsNotEmpty(validationOptionsMsg('icon can not be empty'))
    icon: string;
}