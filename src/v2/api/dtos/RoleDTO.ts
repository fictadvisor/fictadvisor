import { RoleName } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class RoleDTO {
  @IsNotEmpty(validationOptionsMsg('Role name can not be empty'))
    roleName: RoleName;
}