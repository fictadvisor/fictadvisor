import { IsAscii, IsOptional, Matches, MaxLength } from "class-validator";
import { createRegex, ENG_REGEX, NUM_REGEX, UKR_REGEX, UKRSPEC_REGEX } from "../../../utils/GLOBALS";

export class UpdateContactDTO {

    @MaxLength(100, {
      message: 'name is too long (max: 100)',
    })
    @Matches(
      createRegex(UKR_REGEX, ENG_REGEX, NUM_REGEX, UKRSPEC_REGEX),
      {
        message: 'name is not correct (a-zA-Z0-9A-Я(укр.)\\-\' )',
      })
    @IsOptional()
    name?: string;

    @MaxLength(100, {
      message: 'displayName is too long (max: 100)',
    })
    @Matches(
      createRegex(UKR_REGEX, ENG_REGEX, NUM_REGEX, UKRSPEC_REGEX),
      {
        message: 'displayName is not correct (a-zA-Z0-9A-Я(укр.)\\-\' )',
      })
    @IsOptional()
    displayName?: string;

    @MaxLength(200, {
      message: 'link is too long (max: 200)',
    })
    @IsAscii({
      message: 'link contains wrong symbols (ACSII only)',
    })
    @IsOptional()
    link?: string;
  }