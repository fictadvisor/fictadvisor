import { IsOptional, MaxLength } from "class-validator";

export class UpdateContactDTO {

    @MaxLength(100, {
      message: 'value is too long (max: 100)',
    })
    @IsOptional()
    name?: string;

    @MaxLength(100, {
      message: 'value is too long (max: 100)',
    })
    @IsOptional()
    value?: string;
  }