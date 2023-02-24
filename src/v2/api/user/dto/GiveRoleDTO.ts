import { validationOptionsMsg } from '../../../utils/GLOBALS';
import { IsNotEmpty } from 'class-validator';

export class GiveRoleDTO {
  @IsNotEmpty(validationOptionsMsg('roleId can not be empty'))
    roleId: string;
}