import { IsBoolean, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../../../utils/GLOBALS';

export class GrantData {
  @IsNotEmpty(validationOptionsMsg('id can not be empty'))
    id: string;

  @IsNotEmpty(validationOptionsMsg('permission can not be empty'))
    permission: string;

  @IsBoolean()
    set: boolean;
}