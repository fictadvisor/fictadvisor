import { IsBoolean, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty } from '@nestjs/swagger';

export class GroupRequestDTO {
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Group id can not be empty'))
    groupId: string;

  @ApiProperty()
  @IsBoolean(validationOptionsMsg('IsCaptain must be a boolean'))
  @IsNotEmpty(validationOptionsMsg('IsCaptain can not be empty'))
    isCaptain: boolean;
}
