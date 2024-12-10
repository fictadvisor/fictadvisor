import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsAscii, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class CreatePageTextDTO {
  @ApiProperty({
    description: 'Key of new page text',
  })
  @IsAscii(validationOptionsMsg('Key contains wrong symbols (ASCII only)'))
  @IsString(validationOptionsMsg('Key must be string'))
  @IsNotEmpty(validationOptionsMsg('Key cannot be empty'))
    key: string;

  @ApiProperty({
    description: 'Value of new page text',
  })
  @IsString(validationOptionsMsg('Value must be string'))
  @IsNotEmpty(validationOptionsMsg('Value cannot be empty'))
    value: string;

  @ApiPropertyOptional({
    description: 'Link for new page text',
  })
  @IsString(validationOptionsMsg('Link must be a string'))
  @IsAscii(validationOptionsMsg('Link contains wrong symbols (ASCII only)'))
  @IsUrl({}, validationOptionsMsg('Link must be a url'))
  @IsOptional()
    link?: string;

  @ApiPropertyOptional({
    description: 'Should new page text be shown',
  })
  @IsBoolean(validationOptionsMsg('Visibility parameter must be a boolean'))
  @IsOptional()
    isShown?: boolean;
}
