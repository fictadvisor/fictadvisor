import { IsAscii, IsNotEmpty, Matches, MaxLength } from "class-validator";

export class CreateContactDTO {
    @MaxLength(100, {
      message: 'name is too long (max: 100)',
    })
    @IsNotEmpty({
      message: 'name can not be empty',
    })
    @Matches(
      /^[a-zA-Z0-9AБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя\- ]+$/,
      {
        message: 'name is not correct',
      })
    name: string;
    
    @MaxLength(200, {
      message: 'value is too long (max: 200)',
    })
    @IsNotEmpty({
      message: 'value can not be empty',
    })
    @IsAscii({
      message: 'value contains wrong symbols (ACSII only)',
    })
    value: string;
  }