import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty } from '@nestjs/swagger';

export class SelectiveDisciplinesDTO {
  @ApiProperty({
    description: 'Array of discipline ids for association or disassociation with the user',
  })
  @IsNotEmpty(validationOptionsMsg('Array of discipline ids cannot be empty'))
    disciplines: string[];
}