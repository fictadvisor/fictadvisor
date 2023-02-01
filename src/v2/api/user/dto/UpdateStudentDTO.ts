import { IsIn, IsOptional, Matches, MaxLength, MinLength } from "class-validator";
import { State } from "@prisma/client";

export class UpdateStudentDTO {
  @Matches(
    /^[AБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя\- ]+$/,
    {
      message: 'First name is not correct',
    })
  @MinLength(2, {
    message: 'First name is too short',
  })
  @MaxLength(12, {
    message: 'First name is too long',
  })
  @IsOptional()
  firstName?: string;

  @Matches(
    /^[AБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя\- ]+$/,
    {
    message: 'Last name is not correct',
  })
  @MinLength(3, {
    message: 'Last name is too short',
  })
  @MaxLength(20, {
    message: 'Last name is too long',
  })
  @IsOptional()
  lastName?: string;

  @Matches(
    /^[AБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя\- ]+$/,
    {
      message: 'Middle name is not correct',
    })
  @MinLength(6, {
    message: 'Middle name is too short',
  })
  @MaxLength(16, {
    message: 'Middle name is too long',
  })
  @IsOptional()
  middleName?: string;

  groupId?: string;

  @IsIn(Object.keys(State), {
    message: 'invalid state argument passed',
  })
  state?: State;
}