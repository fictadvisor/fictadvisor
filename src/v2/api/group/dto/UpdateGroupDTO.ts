import { Matches } from "class-validator";

export class UpdateGroupDTO{
    @Matches(/І[МПКАСОВТ]-([зпв]|зп)?\d\d(мн|мп|ф)?і?/, {
        message: "Proper name is expected",
    })
    code: string;
}