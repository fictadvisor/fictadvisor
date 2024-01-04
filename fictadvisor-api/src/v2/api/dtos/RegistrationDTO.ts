import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TelegramDTO } from './TelegramDTO';
import { UserDTO } from './UserDTO';
import { StudentDTO } from './StudentDTO';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class RegistrationDTO {
  @ApiProperty()
  @ValidateNested()
  @Type(() => StudentDTO)
    student: StudentDTO;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UserDTO)
    user: UserDTO;

  @ApiPropertyOptional()
  @IsOptional()
    telegram?: TelegramDTO;
}