import { IsArray, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFAQDTO {
  @ApiPropertyOptional({
    description: 'The updated text of the question',
  })
  @IsOptional()
  @MinLength(5, validationOptionsMsg('Text is too short (min: 5)'))
  @MaxLength(300, validationOptionsMsg('Text is too long (max: 300)'))
  @IsString(validationOptionsMsg('Text must be a string'))
    text?: string;

  @ApiPropertyOptional({
    description: 'The updated answer of the question',
  })
  @IsOptional()
  @MinLength(2, validationOptionsMsg('Answer is too short (min: 2)'))
  @MaxLength(300, validationOptionsMsg('Answer is too long (max: 300)'))
  @IsString(validationOptionsMsg('Answer must be a string'))
    answer?: string;

  @ApiPropertyOptional({
    description: 'Updated array of faq categories ids',
  })
  @IsOptional()
  @IsArray(validationOptionsMsg('Categories must be an array'))
  @IsString(validationOptionsMsg('Category id must be a string', true))
  @IsUUID(undefined, validationOptionsMsg('Category id must be UUID', true))
    categories?: string[];
}
