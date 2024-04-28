import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum } from 'class-validator';
import { State } from '../enums/db/StateEnum';
import { validationOptionsMsg } from '../ValidationUtil';

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