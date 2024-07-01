import { IsArray, IsOptional, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFAQDTO {
  @ApiPropertyOptional({
    description: 'The updated text of the question',
  })
  @IsOptional()
  @MinLength(10, validationOptionsMsg('Text is too short (min: 10)'))
  @MaxLength(300, validationOptionsMsg('Text is too long (max: 300)'))
    text?: string;

  @ApiPropertyOptional({
    description: 'The updated answer of the question',
  })
  @IsOptional()
  @MinLength(2, validationOptionsMsg('Answer is too short (min: 2)'))
  @MaxLength(300, validationOptionsMsg('Answer is too long (max: 300)'))
    answer?: string;

  @ApiPropertyOptional({
    description: 'Updated array of question categories',
  })
  @IsOptional()
  @IsArray(validationOptionsMsg('Categories must be an array'))
    categories?: string[];
}
