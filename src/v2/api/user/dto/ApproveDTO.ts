import { State } from '@prisma/client';
import { IsIn } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class ApproveDTO {
  @IsIn(Object.keys(State), validationOptionsMsg('Invalid state argument passed'))
    state: State;
}