import { Injectable } from '@nestjs/common';
import { DbTeacher } from './DbTeacher';

@Injectable()
export class TeacherMapper {
  getTeacher (teacher: DbTeacher) {
    return {
      id: teacher.id,
      firstName: teacher.firstName,
      middleName: teacher.middleName,
      lastName: teacher.lastName,
      description: teacher.description,
      avatar: teacher.avatar,
    };
  }

  getAllTeachers (dbTeachers: DbTeacher[]) {
    const teachers = [];
    for (const dbTeacher of dbTeachers) {
      teachers.push(
        this.getTeacher(dbTeacher)
      );
    };
    return { teachers };
  }
}
