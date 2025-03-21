import { ApiProperty } from '@nestjs/swagger';
import { IsAscii, IsNotEmpty, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

export class CreateResourceDTO {
  @ApiProperty({
    description: 'Name of specific student resource',
  })
  @MinLength(3, validationOptionsMsg('Name is too short (min: 3)'))
  @MaxLength(50, validationOptionsMsg('Name is too long (max: 50)'))
  @IsString(validationOptionsMsg('Name must be a string'))
  @IsNotEmpty(validationOptionsMsg('Name cannot be empty'))
    name: string;

  @ApiProperty({
    description: 'Link to specific student resource',
  })
  @IsString(validationOptionsMsg('Link must be a string'))
  @IsAscii(validationOptionsMsg('Link contains wrong symbols (ASCII only)'))
  @IsUrl(undefined, validationOptionsMsg('Link must be a url'))
  @IsNotEmpty(validationOptionsMsg('Link cannot be empty'))
    link: string;

  @ApiProperty({
    description: 'Icon of specific student resource',
  })
  @IsString(validationOptionsMsg('Image link must be a string'))
  @IsAscii(validationOptionsMsg('Image link contains wrong symbols (ASCII only)'))
  @IsUrl(undefined, validationOptionsMsg('Image link must be a url'))
  @IsNotEmpty(validationOptionsMsg('Icon cannot be empty'))
    imageLink: string;
}
