import { State } from '@prisma/client';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { IsBoolean, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApproveDTO {
  @ApiProperty({
    enum: State,
    description: 'State for student verification',
  })
  @IsEnum(State, validationOptionsMsg('State is not an enum'))
    state: State;
}

export class ApproveStudentByTelegramDTO extends ApproveDTO {
  @ApiProperty({
    description: 'Whether the student is captain or not',
  })
  @IsBoolean(validationOptionsMsg('isCaptain must be a boolean'))
    isCaptain: boolean;
}