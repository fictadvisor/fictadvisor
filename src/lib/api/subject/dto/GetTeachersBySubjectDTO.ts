import { TeacherRoles } from '@/lib/api/teacher/dto/GetTeacherDTO';

export interface GetTeachersBySubjectDTO {
  subjectName: string;
  teachers: {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    avatar: string;
    rating: number;
    roles: TeacherRoles[];
  }[];
}
