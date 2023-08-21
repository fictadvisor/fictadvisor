import { IsEmail } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty } from '@nestjs/swagger';

export class VerificationEmailDTO {
  @ApiProperty()
  @IsEmail({}, validationOptionsMsg('Email is not email'))
    email: string;
}