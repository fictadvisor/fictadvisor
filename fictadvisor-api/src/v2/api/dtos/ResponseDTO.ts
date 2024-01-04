import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class ResponseDTO {
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Question id can not be empty'))
    questionId: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Value can not be empty'))
    value: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('User id can not be empty'))
    userId: string;
}