import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class GoogleDTO {
  @ApiProperty({
    description: 'The user\'s google id token, which holds basic info about their google account and can be verified by google'
  })
  @IsNotEmpty(validationOptionsMsg('Google id token cannot be empty'))
  @IsString(validationOptionsMsg('Google id token must be a string'))
  googleIdToken: string;
}
