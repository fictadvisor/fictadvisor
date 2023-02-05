import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from 'class-transformer';

export class StudentDTO {
  @IsNotEmpty()
  groupId: string;

  @MinLength(2, {
    message: "firstName is too short (min: 2)",
  })
  @MaxLength(40, {
    message: "firstName is too long (max: 40)",
  })
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX), {
      message: 'firstName is not correct',
    })
  @IsNotEmpty({
    message: 'first name is empty',
  })
  firstName: string;

  @MinLength(2, {
    message: 'Middle name is too short (min 2)',
  })
  @MaxLength(40, {
    message: 'Middle name is too long (max 40)',
  })
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    {
      message: 'Middle name is not correct',
    })
  @IsOptional()
  middleName?: string;

  @MinLength(2, {
    message: 'Last name is too short (min 2)',
  })
  @MaxLength(40, {
    message: 'Last name is too long (max 40)',
  })
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    {
      message: 'Last name is not correct',
    })
  @IsNotEmpty({
    message: 'Last name is empty',
    }
  )
  lastName: string;

  @IsBoolean()
  @IsNotEmpty()
  isCaptain: boolean;
}

export class UserDTO {

  @MinLength(2, {
    message: 'username is too short (min: 2)',
  })
  @MaxLength(40, {
    message: 'username is too long (max: 40)',
  })
  @Matches(
    createRegex(ENG_REGEX, NUM_REGEX, "_"),
    {
      message: 'username is not correct',
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

  @MinLength(8,
    {
    message: 'password is too short (min: 8)',
  })
  @MaxLength(50,
    {
    message: 'password is too long (max: 50)',
  })
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]$/,
    {
      message: 'password is not correct',
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