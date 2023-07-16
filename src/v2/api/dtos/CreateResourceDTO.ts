import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class CreateResourceDTO {
  @ApiProperty()
  @MinLength(3, validationOptionsMsg('Name is too short (min: 3)'))
  @MaxLength(50, validationOptionsMsg('Name is too long (max: 50)'))
  @IsNotEmpty(validationOptionsMsg('Name can not be empty'))
    name: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Link can not be empty'))
    link: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Icon can not be empty'))
    icon: string;
}