import { IsAscii, IsOptional, MaxLength } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class UpdateContactDTO {

    @MaxLength(100, validationOptionsMsg('Display name is too long (max: 100)'))
    @IsOptional()
      displayName?: string;

    @MaxLength(200, validationOptionsMsg('Link is too long (max: 200)'))
    @IsAscii(validationOptionsMsg('Link contains wrong symbols (ASCII only)'))
    @IsOptional()
      link?: string;
}