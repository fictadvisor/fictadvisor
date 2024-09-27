import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class StudentOfGroupDTO {
  @ApiProperty({
    description: 'Id of the group',
  })
  @IsUUID(undefined, validationOptionsMsg('Group id must be UUID'))
  @IsNotEmpty(validationOptionsMsg('Group id cannot be empty'))
    groupId: string;
  
  @ApiProperty({
    description: 'Id of the user',
  })
  @IsUUID(undefined, validationOptionsMsg('User id must be UUID'))
  @IsNotEmpty(validationOptionsMsg('User id cannot be empty'))
    userId: string;
}