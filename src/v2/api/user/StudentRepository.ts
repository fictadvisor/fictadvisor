import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../database/PrismaService';
import {UpdateStudentData} from "./dto/UpdateStudentData";

@Injectable()
export class StudentRepository {
  constructor(
    private prisma: PrismaService,
  ) {
  }

  async getRoles(studentId: string) {
    const roles = await this.prisma.userRole.findMany({
      where: {
        studentId,
      },
      include: {
        role: true,
      },
      orderBy: {
        role: {
          weight: 'desc',
        },
      },
    });

    return roles.map((role) => role.role);
  }

  async addRole(studentId: string, roleId: string) {
    return this.prisma.userRole.create({
      data: {
        studentId,
        roleId,
      },
    });
  }

  async removeRole(studentId: string, roleId: string) {
    return this.prisma.userRole.deleteMany({
      where: {
        studentId,
        roleId,
      },
    });
  }

  async updateStudent(userId: string, data: UpdateStudentData) {
    await this.prisma.student.update({
      where: {
        userId,
      },
      data,
    });
  }
}