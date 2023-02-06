import { IsEnum, IsOptional, Matches, MaxLength, MinLength } from "class-validator";
import { State } from "@prisma/client";
import { createRegex, UKR_REGEX, UKRSPEC_REGEX } from "../../../utils/GLOBALS";

export class UpdateStudentDTO {
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    {
      message: 'First name is not correct',
    })
  @MinLength(2, {
    message: 'First name is too short (min 2)',
  })
  @MaxLength(40, {
    message: 'First name is too long (max 40)',
  })
  @IsOptional()
  firstName?: string;

  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    {
    message: 'Last name is not correct',
  })
  @MinLength(2, {
    message: 'Last name is too short (min 2)',
  })
  @MaxLength(40, {
    message: 'Last name is too long (max 40)',
  })
  @IsOptional()
  lastName?: string;

  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    {
      message: 'Middle name is not correct',
    })
  @MinLength(2, {
    message: 'Middle name is too short (min 2)',
  })
  @MaxLength(40, {
    message: 'Middle name is too long (max 40)',
  })
  @IsOptional()
  middleName?: string;

  @IsOptional()
  groupId?: string;

  @IsEnum(State, {
    message: 'invalid state argument passed',
  })
  state?: State;
}