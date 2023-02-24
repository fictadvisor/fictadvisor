import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class ResponseDTO {
  @IsNotEmpty(validationOptionsMsg('questionId can\'t be empty'))
    questionId: string;

  @IsNotEmpty(validationOptionsMsg('value can\'t be empty'))
    value: string;

  @IsNotEmpty(validationOptionsMsg('userId can\'t be empty'))
    userId: string;
}