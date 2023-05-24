import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class ResponseDTO {
  @IsNotEmpty(validationOptionsMsg('Question id can not be empty'))
    questionId: string;

  @IsNotEmpty(validationOptionsMsg('Value can not be empty'))
    value: string;

  @IsNotEmpty(validationOptionsMsg('User id can not be empty'))
    userId: string;
}