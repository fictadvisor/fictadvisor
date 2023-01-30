import {Matches} from "class-validator";

export class CreateDTO {
  @Matches(/І[МПКАСОВТ]-([зпв]|зп)?\d\d(мн|мп|ф)?і?/,{message:("Proper name is expected")})
  name: string;
  code: string;
}