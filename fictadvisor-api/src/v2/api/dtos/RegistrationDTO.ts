import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TelegramDTO } from './TelegramDTO';
import { UserDTO } from './UserDTO';
import { StudentDTO } from './StudentDTO';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
}