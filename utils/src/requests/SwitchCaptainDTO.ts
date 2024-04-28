import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class SwitchCaptainDTO {
  @ApiProperty({
    description: 'Id of a student which is going to be a captain',
  })
  @IsUUID()
  @IsNotEmpty(validationOptionsMsg('Captain id cannot be empty'))
    studentId: string;
}
