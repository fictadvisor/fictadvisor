import { IsNotEmpty, Matches } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDTO {
  @ApiProperty({
    description: 'The new password the user wants to set for his account',
  })
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)[\w\W]+$/,
    validationOptionsMsg('The password must be between 8 and 50 characters long, include at least 1 digit and 1 letter'))
  @IsNotEmpty(validationOptionsMsg('Password is empty'))
    password: string;
}