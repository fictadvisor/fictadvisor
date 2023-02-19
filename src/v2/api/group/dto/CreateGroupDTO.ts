import { Matches } from 'class-validator';

export class CreateGroupDTO {
  @Matches(/І[МПКАСОВТ]-([зпв]|зп)?\d\d(мн|мп|ф)?і?/,
    {
      message: ('Proper name is expected'),
    })
    code: string;
}