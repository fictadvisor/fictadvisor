import { IsEmail, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty } from '@nestjs/swagger';

export class VerificationEmailDTO {
  @ApiProperty({
    description: 'An email of the user for whom resending a letter with confirmation of email address is requested',
  })
  @IsNotEmpty(validationOptionsMsg('Email is empty'))
  @IsEmail({}, validationOptionsMsg('Email is not email'))
    email: string;
}