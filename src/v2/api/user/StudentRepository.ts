import { Injectable } from '@nestjs/common';
import { CreateStudentData } from "./dto/СreateStudentData";
import { UpdateStudentData } from "./dto/UpdateStudentData";
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class StudentRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

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
  async update(userId: string, data: UpdateStudentData) {
    await this.prisma.student.update({
      where: {
        userId,
      },
      data,
    });
  }
  async create(data: CreateStudentData) {
    return this.prisma.student.create({
      data,
    });
  }
}