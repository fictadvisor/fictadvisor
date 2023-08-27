import { State } from '@prisma/client';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { IsBoolean, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApproveDTO {
  @ApiProperty({
    enum: State,
  })
  @IsEnum(State, validationOptionsMsg('State is not an enum'))
    state: State;
}

export class ApproveStudentByTelegramDTO {
  @IsEnum(State, validationOptionsMsg('State is not an enum'))
    state: State;

  @IsBoolean(validationOptionsMsg('isCaptain must be a boolean'))
    isCaptain: boolean;
}