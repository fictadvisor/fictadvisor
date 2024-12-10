import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsAscii,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { validationOptionsMsg } from '../ValidationUtil';

export class UpdatePageTextDTO {
  @ApiProperty({
    description: 'Key of specific page text',
  })
  @IsAscii(validationOptionsMsg('Key contains wrong symbols (ASCII only)'))
  @IsString(validationOptionsMsg('Key must be string'))
  @IsNotEmpty(validationOptionsMsg('Key cannot be empty'))
    key: string;  

  @ApiPropertyOptional({
    description: 'Value of page text',
  })
  @IsString(validationOptionsMsg('Value must be string'))
  @IsOptional()
    value?: string;

  @ApiPropertyOptional({
    description: 'Link for page text',
  })
  @IsString(validationOptionsMsg('Link must be a string'))
  @IsAscii(validationOptionsMsg('Link contains wrong symbols (ASCII only)'))
  @IsUrl({}, validationOptionsMsg('Link must be a valid URL'))
  @IsOptional()
    link?: string;

  @ApiPropertyOptional({
    description: 'Should page text be shown',
  })
  @IsBoolean(validationOptionsMsg('Visibility parameter must be a boolean'))
  @IsOptional()
    isShown?: boolean;
}

export class UpdatePageTextsDTO {
  @ApiProperty({
    type: [UpdatePageTextDTO],
    description: 'Array of page texts to update',
  })
  @IsArray(validationOptionsMsg('PageTexts must be an array'))
  @ValidateNested({ each: true })
  @Type(() => UpdatePageTextDTO)
    pageTexts: UpdatePageTextDTO[];
}
