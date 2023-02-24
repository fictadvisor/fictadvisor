import { IsNotEmpty, Matches } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class UpdateGroupDTO {
    @Matches(/І[МПКАСОВТ]-([зпв]|зп)?\d\d(мн|мп|ф)?і?/, {
      message: 'Proper name is expected',
    })
    @IsNotEmpty(validationOptionsMsg('Code can\'t be empty'))
      code: string;
}