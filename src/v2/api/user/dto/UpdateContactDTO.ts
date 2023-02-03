import { IsAscii, IsOptional, Matches, MaxLength } from "class-validator";

export class UpdateContactDTO {

    @MaxLength(100, {
      message: 'name is too long (max: 100)',
    })
    @Matches(
      /^[a-zA-Z0-9AБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя\- ]+$/,
      {
        message: 'name is not correct',
      })
    @IsOptional()
    name?: string;

    @MaxLength(200, {
      message: 'value is too long (max: 200)',
    })
    @IsAscii({
      message: 'value contains wrong symbols (ACSII only)',
    })
    @IsOptional()
    value?: string;
  }