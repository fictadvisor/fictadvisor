import { IsNotEmpty, IsObject } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class StudentWithUser {
  @IsObject()
    user: {
    id: string,
    username: string,
    email: string,
    telegramId: number,
    avatar: string,
  };

  @IsNotEmpty(validationOptionsMsg('firstName can\'t be empty'))
    firstName: string;

  @IsNotEmpty(validationOptionsMsg('middleName can\'t be empty'))
    middleName: string;

  @IsNotEmpty(validationOptionsMsg('lastName can\'t be empty'))
    lastName: string;

  @IsObject()
    group: {
    id: string,
    code: string,
  };
}