import { Injectable } from '@nestjs/common';
import { Role, Superhero } from '@prisma/client';
import { DbStudent } from '../database/entities/DbStudent';

@Injectable()
export class StudentMapper {
  private getGroupRole (roles: { role: Role }[]) {
    const groupRole = roles.find((r) => r.role.name === 'CAPTAIN' || r.role.name === 'MODERATOR' || r.role.name === 'STUDENT');
    return groupRole?.role;
  }

  getStudent (student: DbStudent, hasGroup = true) {
    return {
      id: student.user.id,
      username: student.user.username,
      email: student.user.email,
      firstName: student.firstName,
      lastName: student.lastName,
      middleName: student.middleName,
      avatar: student.user.avatar,
      telegramId: student.user.telegramId,
      group: !hasGroup ? undefined : {
        ...student.group,
        state: student.state,
        role: this.getGroupRole(student.roles)?.name,
      },
    };
  }

  updateStudent (student: DbStudent) {
    return {
      firstName: student.firstName,
      middleName: student.middleName,
      lastName: student.lastName,
      user: {
        id: student.user.id,
        username: student.user.username,
        email: student.user.email,
        telegramId: student.user.telegramId,
        avatar: student.user.avatar,
        state: student.user.state,
      },
      group: student.group,
      roles: student.roles,
      state: student.state,
    };
  }

  getSuperhero (superhero: Superhero) {
    return {
      userId: superhero.userId,
      dorm: superhero.dorm,
      state: superhero.state,
    };
  }
}