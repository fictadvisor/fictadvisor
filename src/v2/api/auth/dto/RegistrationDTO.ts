import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  ValidateNested,
} from "class-validator";
import { Type } from 'class-transformer';
import { ENG_REGEX, NUM_REGEX, UKR_REGEX, UKRSPEC_REGEX } from "../../../utils/GLOBALS";

export class StudentDTO {
  @IsNotEmpty()
  groupId: string;


  @Matches(
    new RegExp("^[" + UKR_REGEX + UKRSPEC_REGEX + "]{2,40}$"), {
      message: 'firstName is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)',
    })
  @IsNotEmpty({
    message: 'firstName is empty',
  })
  firstName: string;

  @Matches(
    new RegExp("^[" + UKR_REGEX + UKRSPEC_REGEX + "]{2,40}$"), {
      message: 'middleName is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)',
    })
  @IsNotEmpty({
    message: 'middleName is empty',
  })
  @IsOptional()
  middleName?: string;

  @Matches(
    new RegExp("^[" + UKR_REGEX + UKRSPEC_REGEX + "]{2,40}$"), {
      message: 'lastName is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)',
    })
  @IsNotEmpty({
    message: 'lastName is empty',
    }
  )
  lastName: string;

  @IsBoolean()
  @IsNotEmpty()
  isCaptain: boolean;
}

export class UserDTO {

  @Matches(
    new RegExp("^[" + ENG_REGEX + NUM_REGEX + "_" + "]{2,40}$"), {
      message: 'Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)',
    })
  @IsNotEmpty({
    message: 'Username is empty',
  })
  username: string;

  @IsEmail({},
    {
    message: 'Email is not email',
  })
  @IsNotEmpty({
    message: 'Email is empty',
  })
  email: string;

  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z$-/:-?{-~!"^_`\[\]\d]{8,50}$/, {
      message: 'password is not correct or too short (min: 8) or too long (max: 50)',
    })
  @IsNotEmpty({
    message: 'password is empty',
  })
  password: string;
}

export class TelegramDTO {
  auth_date: number;
  first_name: string;
  hash: string;
  id: number;
  last_name: string;
  photo_url: string;
  username: string;
}

export class RegistrationDTO {
  @ValidateNested()
  @Type(() => StudentDTO)
  student: StudentDTO;

  @ValidateNested()
  @Type(() => UserDTO)
  user: UserDTO;

  @IsOptional()
  telegram?: TelegramDTO;
}