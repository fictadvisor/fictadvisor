import { RoleName } from '@prisma/client';
import { GrantData } from './GrantData';
import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../../../utils/GLOBALS';

export class RoleData {
  @IsNotEmpty(validationOptionsMsg('id can not be empty'))
    id: string;
  name: RoleName;
  weight: number;
  grants: GrantData[];

}