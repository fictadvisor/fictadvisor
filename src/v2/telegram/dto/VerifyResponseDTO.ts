import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class VerifyResponseDTO {
  @IsNotEmpty(validationOptionsMsg('disciplineTeacherId can not be empty'))
    disciplineTeacherId: string;

  @IsNotEmpty(validationOptionsMsg('subject can not be empty'))
    subject: string;

  @IsNotEmpty(validationOptionsMsg('teacherName can not be empty'))
    teacherName: string;

  @IsNotEmpty(validationOptionsMsg('userId can not be empty'))
    userId: string;

  @IsNotEmpty(validationOptionsMsg('response can not be empty'))
    response: string;

  @IsNotEmpty(validationOptionsMsg('questionId can not be empty'))
    questionId: string;
}