import { IsArray, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFAQDTO {
  @ApiProperty({
    description: 'The text of the question',
  })
  @IsNotEmpty(validationOptionsMsg('Text can not be empty'))
  @MinLength(10, validationOptionsMsg('Text is too short (min: 10)'))
  @MaxLength(300, validationOptionsMsg('Text is too long (max: 300)'))
  @IsString(validationOptionsMsg('Text must be a string'))
    text: string;

  @ApiProperty({
    description: 'The answer of the question',
  })
  @IsNotEmpty(validationOptionsMsg('Answer can not be empty'))
  @MinLength(2, validationOptionsMsg('Answer is too short (min: 2)'))
  @MaxLength(300, validationOptionsMsg('Answer is too long (max: 300)'))
  @IsString(validationOptionsMsg('Answer must be a string'))
    answer: string;

  @ApiProperty({
    description: 'The array of ids FAQ categories',
  })
  @IsArray(validationOptionsMsg('Categories must be an array'))
  @IsNotEmpty(validationOptionsMsg('Categories can not be empty'))
  @IsString(validationOptionsMsg('Categories must be a string', true))
  @IsUUID(undefined, validationOptionsMsg('Categories must be a UUID', true))
    categories: string[];
}
