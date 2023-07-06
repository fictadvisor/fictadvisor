import { IsNotEmpty, Matches } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDTO {
  @ApiProperty()
  @Matches(
    /І[МПКАСОВТ]-([зпв]|зп)?\d\d(мн|мп|ф)?і?/,
    validationOptionsMsg('Proper name is expected')
  )
  @IsNotEmpty(validationOptionsMsg('Code can not be empty'))
    code: string;
}