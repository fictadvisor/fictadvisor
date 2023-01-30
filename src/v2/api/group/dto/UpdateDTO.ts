import {Matches} from "class-validator";

export class UpdateDTO{
    @Matches(/І[МПКАСОВТ]-([зпв]|зп)?\d\d(мн|мп|ф)?і?/,{message:("Proper name is expected")})
    name: string;
}