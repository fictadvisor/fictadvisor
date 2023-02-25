import { State } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class ApproveDTO {
  @IsEnum(State, validationOptionsMsg('State is not an enum'))
    state: State;
}