import { IsAscii, IsNotEmpty, Matches, MaxLength } from "class-validator";
import { createRegex, ENG_REGEX, NUM_REGEX, UKR_REGEX, UKRSPEC_REGEX } from "../../../utils/GLOBALS";

export class CreateContactDTO {
    @MaxLength(100, {
      message: 'name is too long (max: 100)',
    })
    @IsNotEmpty({
      message: 'name can not be empty',
    })
    @Matches(
      createRegex(UKR_REGEX, ENG_REGEX, NUM_REGEX, UKRSPEC_REGEX),
      {
        message: 'name is not correct (a-zA-Z0-9A-Я(укр.)\\-\' )',
      })
    name: string;

    @MaxLength(100, {
      message: 'displayName is too long (max: 100)',
    })
    @IsNotEmpty({
      message: 'displayName can not be empty',
    })
    @IsAscii({
      message: 'link contains wrong symbols (ACSII only)',
    })
    displayName: string;

    @MaxLength(200, {
      message: 'link is too long (max: 200)',
    })
    @IsNotEmpty({
      message: 'link can not be empty',
    })
    @IsAscii({
      message: 'link contains wrong symbols (ACSII only)',
    })
    link: string;
  }