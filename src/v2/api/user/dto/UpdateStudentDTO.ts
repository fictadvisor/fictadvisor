import { IsEnum, IsOptional, Matches, MaxLength, MinLength } from "class-validator";
import { State } from "@prisma/client";

export class UpdateStudentDTO {
  @Matches(
    /^[AБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя\- ]+$/,
    {
      message: 'First name is not correct',
    })
  @MinLength(2, {
    message: 'First name is too short (min 2)',
  })
  @MaxLength(25, {
    message: 'First name is too long (max 25)',
  })
  @IsOptional()
  firstName?: string;

  @Matches(
    /^[AБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя\- ]+$/,
    {
    message: 'Last name is not correct',
  })
  @MinLength(3, {
    message: 'Last name is too short (min 3)',
  })
  @MaxLength(40, {
    message: 'Last name is too long (max 40)',
  })
  @IsOptional()
  lastName?: string;

  @Matches(
    /^[AБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя\- ]+$/,
    {
      message: 'Middle name is not correct',
    })
  @MinLength(2, {
    message: 'Middle name is too short (min 2)',
  })
  @MaxLength(20, {
    message: 'Middle name is too long (max 20)',
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