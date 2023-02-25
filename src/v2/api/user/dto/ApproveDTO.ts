import { State } from '@prisma/client';
import { IsBoolean, IsEnum, IsIn } from 'class-validator';

export class ApproveDTO {
  @IsIn(Object.keys(State), {
    message: 'Invalid state argument passed',
  })
    state: State;
}

export class ApproveStudentByTelegramDTO {
  @IsEnum(State, {message: 'State is not an enum'})
  state: State;
  @IsBoolean({message: 'isCaptain must be a boolean'})
  isCaptain: boolean;
}