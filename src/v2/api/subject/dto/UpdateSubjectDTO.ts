import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
import { createRegex, UKR_REGEX, UKRSPEC_REGEX } from "../../../utils/GLOBALS";

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
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    {
      message: 'name incorrect',
    }
  )
  name: string;
}