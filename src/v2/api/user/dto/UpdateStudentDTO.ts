import { IsOptional, Matches, MaxLength, MinLength } from "class-validator";
import { State } from "@prisma/client";

export class UpdateStudentDTO {
  @Matches(
    /^[AБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя\- ]+$/,
    {
      message: 'Name is not correct',
    })
  @MinLength(2, {
    message: 'Name is too short',
  })
  @MaxLength(12, {
    message: 'Name is too long',
  })
  @IsOptional()
  firstName?: string;

  @Matches(
    /^[AБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя\- ]+$/,
    {
    message: 'Name is not correct',
  })
  @MinLength(3, {
    message: 'Name is too short',
  })
  @MaxLength(20, {
    message: 'Name is too long',
  })
  @IsOptional()
  lastName?: string;

  @Matches(
    /^[AБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя\- ]+$/,
    {
      message: 'Name is not correct',
    })
  @MinLength(6, {
    message: 'Name is too short',
  })
  @MaxLength(16, {
    message: 'Name is too long',
  })
  @IsOptional()
  middleName?: string;

  groupId?: string;

  state?: State;
}