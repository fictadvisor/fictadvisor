import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class SelectiveDisciplinesDTO {
  @ApiProperty({
    description: 'Array of discipline ids for association or disassociation with the user',
  })
  @IsNotEmpty(validationOptionsMsg('Array of discipline ids cannot be empty'))
    disciplines: string[];
}