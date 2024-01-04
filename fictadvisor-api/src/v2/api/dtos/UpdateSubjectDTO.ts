import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import {
  createRegex,
  ENG_REGEX,
  NUM_REGEX,
  PUNCTUAL_REGEX,
  UKR_REGEX,
  validationOptionsMsg,
} from '../../utils/GLOBALS';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubjectDTO {
  @ApiProperty()
  @MinLength(5, validationOptionsMsg('Name is too short (min: 5)'))
  @MaxLength(150, validationOptionsMsg('Name is too long (max: 150)'))
  @IsNotEmpty(validationOptionsMsg('Name can not be empty'))
  @Matches(
    createRegex(UKR_REGEX, ENG_REGEX, NUM_REGEX, PUNCTUAL_REGEX),
    validationOptionsMsg('Name is incorrect (a-zA-Z0-9A-Я(укр.)\\-\' )(/+.,")')
  )
    name: string;
}