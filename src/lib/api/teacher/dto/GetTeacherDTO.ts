export interface GetTeacherDTO {
  id?: string;
  firstName?: boolean;
  middleName?: boolean;
  lastName?: boolean;
  description?: boolean;
  avatar?: boolean;
}
export interface GetTeachersDTO {
  teachers: GetTeacherDTO[];
}
