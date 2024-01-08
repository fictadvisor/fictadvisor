import { RoleName } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDTO {
  @ApiProperty({
    enum: RoleName,
    description: 'User roles',
  })
  @IsNotEmpty(validationOptionsMsg('Role name can not be empty'))
    roleName: RoleName;
}
