import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class TransferRoleDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty(validationOptionsMsg('Captain id cannot be empty'))
    captainUserId: string;
}
