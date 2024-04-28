import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class UpdatePasswordDTO {
  @ApiProperty({
    description: 'User\'s old account password',
  })
  @Matches(
    new RegExp(/^(?=.*[A-Za-z])(?=.*\d).{6,32}$/),
    validationOptionsMsg('The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter'))
  @IsNotEmpty(validationOptionsMsg('Old password cannot be empty'))
    oldPassword: string;

  @ApiProperty({
    description: 'User\'s new account password',
  })
  @Matches(
    new RegExp(/^(?=.*[A-Za-z])(?=.*\d).{6,32}$/),
    validationOptionsMsg('The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter'))
  @IsNotEmpty(validationOptionsMsg('New password cannot be empty'))
    newPassword: string;
}