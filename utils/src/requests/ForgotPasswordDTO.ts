import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class ForgotPasswordDTO {
  @ApiProperty({
    description: 'Email address of the user for whom you want to initiate the password reset procedure',
  })
  @IsEmail({}, validationOptionsMsg('Email is not an email'))
  @IsNotEmpty(validationOptionsMsg('Email cannot be empty'))
    email: string;
}
