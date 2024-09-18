import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { State } from '../enums';
import { validationOptionsMsg } from '../ValidationUtil';

export class ApproveDTO {
  @ApiProperty({
    enum: State,
    description: 'State for student verification',
  })
  @IsEnum(State, validationOptionsMsg('State must be an enum'))
  @IsNotEmpty(validationOptionsMsg('State cannot be empty'))
    state: State;
}

export class ApproveStudentByTelegramDTO extends ApproveDTO {
  @ApiProperty({
    description: 'Whether the student is captain or not',
  })
  @IsBoolean(validationOptionsMsg('IsCaptain must be a boolean'))
  @IsNotEmpty(validationOptionsMsg('IsCaptain can not be empty'))
    isCaptain: boolean;
}
