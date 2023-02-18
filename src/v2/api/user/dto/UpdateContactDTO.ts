import { IsAscii, IsOptional,  MaxLength } from "class-validator";

export class UpdateContactDTO {

    @MaxLength(100, {
      message: 'displayName is too long (max: 100)',
    })
    @IsAscii({
      message: 'link contains wrong symbols (ACSII only)',
    })
    @IsOptional()
    displayName?: string;

    @MaxLength(200, {
      message: 'link is too long (max: 200)',
    })
    @IsAscii({
      message: 'link contains wrong symbols (ACSII only)',
    })
    @IsOptional()
    link?: string;
  }