import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TelegramDTO } from './TelegramDTO';
import { UserDTO } from './UserDTO';
import { StudentDTO } from './StudentDTO';
export class RegistrationDTO {
  @ValidateNested()
  @Type(() => StudentDTO)
    student: StudentDTO;

  @ValidateNested()
  @Type(() => UserDTO)
    user: UserDTO;

  @IsOptional()
    telegram?: TelegramDTO;
}