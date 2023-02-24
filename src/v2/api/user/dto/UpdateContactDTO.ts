import { IsAscii, IsOptional, MaxLength } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class UpdateContactDTO {

    @MaxLength(100, validationOptionsMsg('displayName is too long (max: 100)'))
    @IsAscii(validationOptionsMsg('link contains wrong symbols (ACSII only)'))
    @IsOptional()
      displayName?: string;

    @MaxLength(200, validationOptionsMsg('link is too long (max: 200)'))
    @IsAscii(validationOptionsMsg('link contains wrong symbols (ACSII only)'))
    @IsOptional()
      link?: string;
}