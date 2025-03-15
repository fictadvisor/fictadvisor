import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

export class SelectiveDisciplinesDTO {
  @ApiProperty({
    description: 'Array of discipline ids for association or disassociation with the user',
  })
  @IsString(validationOptionsMsg('Array of discipline ids must contain only string values', true))
  @IsNotEmpty(validationOptionsMsg('Array of discipline ids cannot be empty'))
    disciplines: string[];
}
