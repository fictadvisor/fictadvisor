import { IsAscii, IsNotEmpty, Matches, MaxLength } from 'class-validator';
import {
  createRegex,
  ENG_REGEX,
  NUM_REGEX,
  UKR_REGEX,
  UKRSPEC_REGEX,
  validationOptionsMsg,
} from '../../utils/GLOBALS';

export class CreateContactDTO {
    @MaxLength(100, validationOptionsMsg('Name is too long (max: 100)'))
    @IsNotEmpty(validationOptionsMsg('Name can not be empty'))
    @Matches(
      createRegex(UKR_REGEX, ENG_REGEX, NUM_REGEX, UKRSPEC_REGEX),
      validationOptionsMsg('Name is not correct (a-zA-Z0-9A-Я(укр.)\\-\' )'),
    )
      name: string;

    @MaxLength(100, validationOptionsMsg('Display name is too long (max: 100)'))
    @IsNotEmpty(validationOptionsMsg('Display name can not be empty'))
      displayName: string;

    @MaxLength(200, validationOptionsMsg('Link is too long (max: 200)'))
    @IsNotEmpty(validationOptionsMsg('Link can not be empty'))
    @IsAscii(validationOptionsMsg('Link contains wrong symbols (ASCII only)'))
      link: string;
}