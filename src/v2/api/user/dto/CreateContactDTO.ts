import { IsAscii, IsNotEmpty, Matches, MaxLength } from "class-validator";
import { createRegex, ENG_REGEX, NUM_REGEX, UKR_REGEX } from "../../../utils/GLOBALS";

export class CreateContactDTO {
    @MaxLength(100, {
      message: 'name is too long (max: 100)',
    })
    @IsNotEmpty({
      message: 'name can not be empty',
    })
    @Matches(
      createRegex(UKR_REGEX, ENG_REGEX, NUM_REGEX, "\\ "),
      {
        message: 'name is not correct',
      })
    name: string;
    
    @MaxLength(200, {
      message: 'value is too long (max: 200)',
    })
    @IsNotEmpty({
      message: 'value can not be empty',
    })
    @IsAscii({
      message: 'value contains wrong symbols (ACSII only)',
    })
    value: string;
  }