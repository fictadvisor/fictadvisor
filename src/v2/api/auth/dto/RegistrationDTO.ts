import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

export class RegistrationDTO {
  @ValidateNested({ each: true })
  @Type(() => StudentDTO)
  student: StudentDTO;

  @ValidateNested({ each: true })
  @Type(() => UserDTO)
  user: UserDTO;

  @IsOptional()
  telegram: TelegramDTO;
}

export class StudentDTO {
  @IsNotEmpty()
  groupId: string;

  @Matches(
    /^[AБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя\- ]+$/, {
      message: 'firstName is not correct',
  })
  @MinLength(2, {
    message: 'firstName is too short (min: 2)',
  })
  @MaxLength(40, {
    message: 'firstName is too long (max: 40)',
  })
  @IsNotEmpty()
  firstName: string;

  @Matches(
    /^[AБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя\- ]+$/, {
      message: 'middleName is not correct',
  })
  @MinLength(2, {
    message: 'middleName is too short (min: 2)',
  })
  @MaxLength(40, {
    message: 'middleName is too long (max: 40)',
  })
  @IsOptional()
  middleName: string;

  @Matches(
    /^[AБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя\- ]+$/, {
      message: 'lastName is not correct',
  })
  @MinLength(2, {
    message: 'lastName is too short (min: 2)',
  })
  @MaxLength(40, {
    message: 'lastName is too long (max: 40)',
  })
  @IsNotEmpty()
  lastName: string;

  @IsBoolean()
  @IsNotEmpty()
  isCaptain: boolean;
}

export class UserDTO {
  @MinLength(2, {
    message: 'username is too short (min: 4)',
  })
  @MaxLength(40, {
    message: 'username is too long (max: 40)',
  })
  @Matches(
    /^[a-zA-Z0-9_]+$/, {
      message: 'username is not correct',
  })
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message: 'password is not correct',
  })
  @MinLength(7, {
    message: 'password is too short (min: 8)',
  })
  @MaxLength(50, {
    message: 'password is too long (max: 50)',
  })
  @IsNotEmpty()
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