import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { State } from '../enums/db/StateEnum';

export class UpdateSuperheroDTO {
  @ApiPropertyOptional({
    description: 'Wherther the user is a superhero or not',
  })
  @IsOptional()
  @IsBoolean(validationOptionsMsg('Dorm is not a boolean'))
    dorm?: boolean;
  
  @ApiPropertyOptional({
    description: 'State for superhero verification',
    default: State.PENDING,
  })
  @IsOptional()
  @IsEnum(State, validationOptionsMsg('State is not an enum'))
    state?: State;
}