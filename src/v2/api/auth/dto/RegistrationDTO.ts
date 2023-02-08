import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, Matches, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

export class StudentDTO {
  @IsNotEmpty()
  groupId: string;

  @Matches(
    /^[AБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя\- ]{2,40}$/, {
      message: 'firstName is not correct or too short (min: 2) or too long (max: 40)',
    })
  @IsNotEmpty()
  firstName: string;

  @Matches(
    /^[AБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя\- ]{2,40}$/, {
      message: 'middleName is not correct or too short (min: 2) or too long (max: 40)',
    })
  @IsOptional()
  middleName: string;

  @Matches(
    /^[AБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя\- ]{2,40}$/, {
      message: 'lastName is not correct or too short (min: 2) or too long (max: 40)',
    })
  @IsNotEmpty()
  lastName: string;

  @IsBoolean()
  @IsNotEmpty()
  isCaptain: boolean;
}

export class UserDTO {
  @Matches(
    /^[a-zA-Z0-9_]{2,40}$/, {
      message: 'username is not correct or too short (min: 2) or too long (max: 40)',
    })
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}$/, {
      message: 'password is not correct or too short (min: 8) or too long (max: 50)',
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

export class RegistrationDTO {
  @ValidateNested()
  @Type(() => StudentDTO)
  student: StudentDTO;

  @ValidateNested()
  @Type(() => UserDTO)
  user: UserDTO;

  @IsOptional()
  telegram: TelegramDTO;
}