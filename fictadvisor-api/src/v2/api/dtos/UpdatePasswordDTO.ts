import { IsNotEmpty, Matches } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDTO {
  @ApiProperty({
    description: 'User\'s old account password',
  })
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)[\w\W]+$/,
    validationOptionsMsg('The password must be between 8 and 50 characters long, include at least 1 digit and 1 letter'))
  @IsNotEmpty(validationOptionsMsg('Old password cannot be empty'))
    oldPassword: string;

  @ApiProperty({
    description: 'User\'s new account password',
  })
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)[\w\W]+$/,
    validationOptionsMsg('The password must be between 8 and 50 characters long, include at least 1 digit and 1 letter'))
  @IsNotEmpty(validationOptionsMsg('New password cannot be empty'))
    newPassword: string;
}