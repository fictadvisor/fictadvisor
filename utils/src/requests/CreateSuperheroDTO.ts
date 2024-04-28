import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class CreateSuperheroDTO {
  @ApiProperty({
    description: 'Whether the superhero is in dormintory or not',
  })
  @IsBoolean(validationOptionsMsg('Dorm is not a boolean'))
    dorm: boolean;
}