import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
import { createRegex, ENG_REGEX, NUM_REGEX, PUNCTUAL_REGEX, UKR_REGEX } from "../../../utils/GLOBALS";

export class UpdateSubjectDTO {
  @MinLength(5, {
    message: 'name is too short (min: 5)',
  })
  @MaxLength(150, {
    message: 'name is too long (max: 150)',
  })
  @IsNotEmpty({
    message: 'name can not be empty',
  })
  @Matches(
    createRegex(UKR_REGEX, ENG_REGEX, NUM_REGEX, PUNCTUAL_REGEX),
    {
      message: 'name is incorrect (a-zA-Z0-9A-Я(укр.)\\-\' )(/+.,")',
    }
  )
  name: string;
}