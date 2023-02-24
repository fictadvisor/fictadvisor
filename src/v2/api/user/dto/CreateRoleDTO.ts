import { RoleName } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class CreateRoleDTO {
  @IsEnum(RoleName)
  @IsNotEmpty(validationOptionsMsg('name can not be empty'))
    name: RoleName;

  @IsNumber()
  @IsNotEmpty(validationOptionsMsg('weight can not be empty'))
    weight: number;
}