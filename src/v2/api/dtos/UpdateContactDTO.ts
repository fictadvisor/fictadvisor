import { IsAscii, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateContactDTO {
    @ApiPropertyOptional()
    @MaxLength(100, validationOptionsMsg('Display name is too long (max: 100)'))
    @IsOptional()
      displayName?: string;

    @ApiPropertyOptional()
    @MaxLength(200, validationOptionsMsg('Link is too long (max: 200)'))
    @IsAscii(validationOptionsMsg('Link contains wrong symbols (ASCII only)'))
    @IsUrl({}, validationOptionsMsg('Link is not a url'))
    @IsOptional()
      link?: string;
}