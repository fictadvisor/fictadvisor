import { State } from '@prisma/client';
import { IsIn } from "class-validator";

export class ApproveDTO {
  @IsIn(Object.keys(State), {
    message: 'Invalid state argument passed',
  })
  state: State;
}