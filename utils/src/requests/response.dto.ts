import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

export class ResponseDTO {
  @ApiProperty({
    description: 'Id of the question',
  })
  @IsString(validationOptionsMsg('Question id must be a string'))
  @IsNotEmpty(validationOptionsMsg('Question id can not be empty'))
    questionId: string;

  @ApiProperty({
    description: 'Text of the answer',
  })
  @IsString(validationOptionsMsg('Value must be a string'))
  @IsNotEmpty(validationOptionsMsg('Value can not be empty'))
    value: string;

  @ApiProperty({
    description: 'Id of the user',
  })
  @IsString(validationOptionsMsg('User id must be a string'))
  @IsNotEmpty(validationOptionsMsg('User id can not be empty'))
    userId: string;
}
