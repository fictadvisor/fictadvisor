import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class FAQCategoryDTO {
  @ApiProperty({
    description: 'Category name',
  })
  @IsNotEmpty(validationOptionsMsg('Name cannot be empty'))
  @IsString(validationOptionsMsg('Name must be a string'))
  @MinLength(2, validationOptionsMsg('Name is too short (min: 2)'))
  @MaxLength(20, validationOptionsMsg('Name is too long (max: 50)'))
    name: string;
}