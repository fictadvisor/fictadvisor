import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { State } from '../enums';

export class UpdateSuperheroDTO {
  @ApiPropertyOptional({
    description: 'Whether the user is a superhero or not',
  })
  @IsOptional()
  @IsBoolean(validationOptionsMsg('Dorm must be a boolean'))
    dorm?: boolean;

  @ApiPropertyOptional({
    description: 'State for superhero verification',
    enum: State,
    default: State.PENDING,
  })
  @IsOptional()
  @IsEnum(State, validationOptionsMsg('State must be an enum'))
    state?: State;
}
