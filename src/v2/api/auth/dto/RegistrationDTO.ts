export interface RegistrationDTO extends StudentDTO{
  username: string,
  email: string,
  password: string,
  isCaptain: boolean,
}

export interface StudentDTO {
  groupId: string,
  firstName: string,
  middleName: string,
  lastName: string,
}