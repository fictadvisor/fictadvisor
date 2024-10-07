import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class ResetPasswordDTO {
  @ApiProperty({
    description: 'The new password the user wants to set for his account',
  })
  @Matches(
    new RegExp(/^(?=.*[A-Za-z])(?=.*\d).{6,32}$/),
    validationOptionsMsg('The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter'))
  @IsNotEmpty(validationOptionsMsg('Password cannot be empty'))
    password: string;
}
