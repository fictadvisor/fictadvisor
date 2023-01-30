import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export interface RegistrationDTO {
  student: StudentDTO,
  user: UserDTO,
  telegram: TelegramDTO
}

export interface StudentDTO {
  groupId: string,
  firstName: string,
  middleName: string,
  lastName: string,
  isCaptain: boolean
}

export class UserDTO {
  username: string;
  email: string;

  @MinLength(7, {
    message: 'password is too short (min: 7)',
  })
  @MaxLength(50, {
    message: 'password is too long (max: 50)',
  })
  @IsNotEmpty()
  password: string;
}

export interface TelegramDTO {
  auth_date: number;
  first_name: string;
  hash: string;
  id: number;
  last_name: string;
  photo_url: string;
  username: string;
}