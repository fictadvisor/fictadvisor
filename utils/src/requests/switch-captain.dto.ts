import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

export class SwitchCaptainDTO {
  @ApiProperty({
    description: 'Id of a student which is going to be a captain',
  })
  @IsUUID(undefined, validationOptionsMsg('Student id must be UUID'))
  @IsNotEmpty(validationOptionsMsg('Student id cannot be empty'))
    studentId: string;
}
