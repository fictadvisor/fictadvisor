import { ApiPropertyOptional } from '@nestjs/swagger';
import {IsAscii, IsOptional, IsUrl, Matches, MaxLength} from 'class-validator';
import {createRegex, ENG_REGEX, NUM_REGEX, UKR_REGEX, UKRSPEC_REGEX, validationOptionsMsg} from '../ValidationUtil';

export class UpdateContactDTO {
    @ApiPropertyOptional({
      description: 'Name of a contact to create',
    })
    @MaxLength(100, validationOptionsMsg('Name is too long (max: 100)'))
    @Matches(
      createRegex(UKR_REGEX, ENG_REGEX, NUM_REGEX, UKRSPEC_REGEX),
      validationOptionsMsg('Name is not correct (a-zA-Z0-9A-Я(укр.)\\-\' )'),
    )
    @IsOptional()
      name?: string;

    @ApiPropertyOptional({
      description: 'Displayed name of an updated contact',
    })
    @MaxLength(100, validationOptionsMsg('Display name is too long (max: 100)'))
    @IsOptional()
      displayName?: string;

    @ApiPropertyOptional({
      description: 'Link of an updated contact',
    })
    @MaxLength(200, validationOptionsMsg('Link is too long (max: 200)'))
    @IsAscii(validationOptionsMsg('Link contains wrong symbols (ASCII only)'))
    @IsUrl({}, validationOptionsMsg('Link is not a url'))
    @IsOptional()
      link?: string;
}
