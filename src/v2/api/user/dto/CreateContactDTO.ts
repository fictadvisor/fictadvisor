import { IsAscii, IsNotEmpty, Matches, MaxLength } from 'class-validator';
import {
  createRegex,
  ENG_REGEX,
  NUM_REGEX,
  UKR_REGEX,
  UKRSPEC_REGEX,
  validationOptionsMsg,
} from '../../../utils/GLOBALS';

export class CreateContactDTO {
    @MaxLength(100, validationOptionsMsg('name is too long (max: 100)'))
    @IsNotEmpty(validationOptionsMsg('name can not be empty'))
    @Matches(
      createRegex(UKR_REGEX, ENG_REGEX, NUM_REGEX, UKRSPEC_REGEX),
      {
        message: 'name is not correct (a-zA-Z0-9A-Я(укр.)\\-\' )',
      })
      name: string;

    @MaxLength(100, validationOptionsMsg('displayName is too long (max: 100)'))
    @IsNotEmpty(validationOptionsMsg('displayName can not be empty'))
    @IsAscii(validationOptionsMsg('link contains wrong symbols (ACSII only)'))
      displayName: string;

    @MaxLength(200, validationOptionsMsg('link is too long (max: 200)'))
    @IsNotEmpty(validationOptionsMsg('link can not be empty'))
    @IsAscii(validationOptionsMsg('link contains wrong symbols (ACSII only)'))
      link: string;
}