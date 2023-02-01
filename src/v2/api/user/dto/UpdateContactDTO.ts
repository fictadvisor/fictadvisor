import { IsAlpha, IsAscii, IsOptional, MaxLength } from "class-validator";

export class UpdateContactDTO {

    @MaxLength(20, {
      message: 'name is too long (max: 100)',
    })
    @IsAlpha('en-US',
      {
        message: 'name contains wrong symbols (a-z A-Z only)',
      })
    @IsOptional()
    name?: string;

    @MaxLength(100, {
      message: 'value is too long (max: 100)',
    })
    @IsAscii({
      message: 'value contains wrong symbols (ACSII only)',
    })
    @IsOptional()
    value?: string;
  }