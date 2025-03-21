import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbStudent } from '../entities/student.entity';
import { PrismaRepository } from '../prisma.repository';
import { Prisma } from '@prisma/client/fictadvisor';

@Injectable()
export class StudentRepository extends PrismaRepository<'student', DbStudent> {
  private static include: Prisma.StudentInclude = {
    group: {
      include: {
        cathedra: true,
        educationalProgram: {
          include: {
            speciality: true,
          },
        },
      },
    },
    roles: {
      include: {
        role: true,
      },
    },
    selectiveDisciplines: {
      include: {
        discipline: true,
      },
    },
    user: true,
  };

  constructor (private prisma: PrismaService) {
    super(prisma.student, StudentRepository.include);
  }

  updateById (userId: string, data: Prisma.StudentUpdateInput | Prisma.StudentUncheckedUpdateInput): Promise<DbStudent> {
    return this.prisma.student.update({
      include: StudentRepository.include,
      where: { userId },
      data,
    });
  }

  deleteById (userId: string): Promise<DbStudent> {
    return this.prisma.student.delete({
      include: StudentRepository.include,
      where: { userId },
    });
  }
}
