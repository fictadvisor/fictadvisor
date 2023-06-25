import { TeacherRoles } from '@/lib/api/teacher/dto/GetTeacherDTO';

export interface PollTeachersDTO {
  teachers: {
    disciplineTeacherId: string;
    roles: TeacherRoles[];
    firstName: string;
    middleName: string;
    lastName: string;
    avatar: string;
    subject: {
      id: string;
      name: string;
    };
  }[];
  hasSelectedInLastSemester: boolean;
}
