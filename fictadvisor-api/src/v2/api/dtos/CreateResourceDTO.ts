import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class CreateResourceDTO {
  @ApiProperty({
    description: 'Name of specific student resource',
  })
  @MinLength(3, validationOptionsMsg('Name is too short (min: 3)'))
  @MaxLength(50, validationOptionsMsg('Name is too long (max: 50)'))
  @IsNotEmpty(validationOptionsMsg('Name can not be empty'))
    name: string;

  @ApiProperty({
    description: 'Link to specific student resource',
  })
  @IsNotEmpty(validationOptionsMsg('Link can not be empty'))
    link: string;

  @ApiProperty({
    description: 'Icon of specific student resource',
  })
  @IsNotEmpty(validationOptionsMsg('Icon can not be empty'))
    imageLink: string;
}