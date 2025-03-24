import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

export class GiveRoleDTO {
  @ApiProperty({
    description: 'Role that user is going to get',
  })
  @IsNotEmpty(validationOptionsMsg('Role id cannot be empty'))
    roleId: string;
}
