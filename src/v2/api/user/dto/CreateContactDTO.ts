import { IsAlpha, IsAscii, IsNotEmpty, MaxLength } from "class-validator";

export class CreateContactDTO {
    @MaxLength(20, {
      message: 'name is too long (max: 20)',
    })
    @IsNotEmpty({
      message: 'name can not be empty',
    })
    @IsAlpha('en-US',
      {
        message: 'name contains wrong symbols (a-z A-Z only)',
    })
    name: string;
    
    @MaxLength(100, {
      message: 'value is too long (max: 100)',
    })
    @IsNotEmpty({
      message: 'value can not be empty',
    })
    @IsAscii({
      message: 'value contains wrong symbols (ACSII only)',
    })
    value: string;
  }