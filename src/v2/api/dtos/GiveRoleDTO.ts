import { validationOptionsMsg } from '../../utils/GLOBALS';
import { IsNotEmpty } from 'class-validator';

export class GiveRoleDTO {
  @IsNotEmpty(validationOptionsMsg('Role id cannot be empty'))
    roleId: string;
}
