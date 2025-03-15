import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

export class QueryAllPageTextsDTO {
  @ApiProperty({
    description: 'Keys of necessary page texts',
  })
  @IsNotEmpty(validationOptionsMsg('Keys cannot be empty'))
    keys: string[];
}
