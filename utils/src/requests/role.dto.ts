import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';
import { RoleName } from '../enums';

export class RoleDTO {
  @ApiProperty({
    enum: RoleName,
    description: 'User roles',
  })
  @IsEnum(RoleName, validationOptionsMsg('Role name must be enum'))
  @IsNotEmpty(validationOptionsMsg('Role name cannot be empty'))
    roleName: RoleName;
}
