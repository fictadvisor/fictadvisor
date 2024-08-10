import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TelegramDTO } from './TelegramDTO';
import { UserDTO } from './UserDTO';
import { StudentDTO } from './StudentDTO';
import { validationOptionsMsg } from '../ValidationUtil';

export class RegistrationDTO {
  @ApiProperty({
    description: 'Information about student',
  })
  @ValidateNested()
  @Type(() => StudentDTO)
    student: StudentDTO;

  @ApiProperty({
    description: 'User\'s credentials',
  })
  @ValidateNested()
  @Type(() => UserDTO)
    user: UserDTO;

  @ApiPropertyOptional({
    description: 'Information about user\'s telegram',
  })
  @IsOptional()
    telegram?: TelegramDTO;

  @ApiPropertyOptional({
    description: 'User\'s google id token',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('The google id token must be a string'))
  @IsNotEmpty(validationOptionsMsg('The google id token cannot be empty'))
    googleIdToken?: string;
}
