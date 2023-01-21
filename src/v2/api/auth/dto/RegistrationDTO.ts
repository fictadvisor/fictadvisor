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

export interface UserDTO {
  username: string,
  email: string,
  password: string,
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