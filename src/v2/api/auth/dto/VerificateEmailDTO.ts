import { IsEmail } from 'class-validator';

export class VerificateEmailDTO {
    @IsEmail()
      email: string;
}