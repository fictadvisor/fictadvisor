import { validationOptionsMsg } from '../../utils/GLOBALS';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GiveRoleDTO {
  @ApiProperty({
    description: 'Role that user is going to get',
  })
  @IsNotEmpty(validationOptionsMsg('Role id cannot be empty'))
    roleId: string;
}
