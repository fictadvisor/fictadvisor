import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class CreateSuperheroDTO {
  @ApiProperty({
    description: 'Whether the superhero is in dormitory or not',
  })
  @IsBoolean(validationOptionsMsg('Dorm must be a boolean'))
  @IsNotEmpty(validationOptionsMsg('Dorm cannot be empty'))
    dorm: boolean;
}
