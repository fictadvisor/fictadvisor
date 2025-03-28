import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TelegramDTO } from './telegram.dto';
import { UserDTO } from './user.dto';
import { StudentDTO } from './student.dto';

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
