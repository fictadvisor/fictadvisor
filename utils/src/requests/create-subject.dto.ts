import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import {
  createRegex,
  ENG_REGEX,
  NUM_REGEX,
  PUNCTUAL_REGEX,
  UKR_REGEX,
  validationOptionsMsg,
} from '../validation.util';

export class CreateSubjectDTO {
  @ApiProperty({
    description: 'Subject name',
  })
  @IsString(validationOptionsMsg('Name must be a string'))
  @MinLength(5, validationOptionsMsg('Name is too short (min: 5)'))
  @MaxLength(150, validationOptionsMsg('Name is too long (max: 150)'))
  @IsNotEmpty(validationOptionsMsg('Name cannot be empty'))
  @Matches(
    createRegex(UKR_REGEX, PUNCTUAL_REGEX, ENG_REGEX, NUM_REGEX),
    validationOptionsMsg('Name is incorrect (a-zA-Z0-9A-Я(укр.)\\-\' )(/+.,")')
  )
    name: string;
}
