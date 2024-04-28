import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { RoleName } from '../enums/db/RoleNameEnum';

export class RoleDTO {
  @ApiProperty({
    enum: RoleName,
    description: 'User roles',
  })
  @IsNotEmpty(validationOptionsMsg('Role name can not be empty'))
    roleName: RoleName;
}
