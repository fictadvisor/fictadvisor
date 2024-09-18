import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class GroupRequestDTO {
  @ApiProperty({
    description: 'Group id',
  })
  @IsString(validationOptionsMsg('Group id must be a string'))
  @IsNotEmpty(validationOptionsMsg('Group id cannot be empty'))
    groupId: string;

  @ApiProperty({
    description: 'Whether the student is captain or not',
  })
  @IsBoolean(validationOptionsMsg('IsCaptain must be a boolean'))
  @IsNotEmpty(validationOptionsMsg('IsCaptain cannot be empty'))
    isCaptain: boolean;
}
