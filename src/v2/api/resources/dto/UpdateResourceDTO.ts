import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class UpdateResourceDTO {
  @MinLength(3, validationOptionsMsg('name is too short (min: 3)'))
  @MaxLength(50, validationOptionsMsg('name is too long (max: 50)'))
  @IsOptional()
    name: string;

  @IsOptional()
    link: string;

  @IsOptional()
    icon: string;
}