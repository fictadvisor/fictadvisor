import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbStudent } from '../entities/student.entity';
import { PrismaRepository } from '../prisma.repository';
import { Prisma } from '@prisma-client/fictadvisor';

@Injectable()
export class StudentRepository extends PrismaRepository<'student', DbStudent> {
  private static include = {
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

  updateById<T = DbStudent> (userId: string, data: Prisma.StudentUpdateInput | Prisma.StudentUncheckedUpdateInput): Promise<T> {
    return this.prisma.student.update({
      include: StudentRepository.include,
      where: { userId },
      data,
    }) as unknown as Promise<T>;
  }

  deleteById<T = DbStudent> (userId: string): Promise<T> {
    return this.prisma.student.delete({
      include: StudentRepository.include,
      where: { userId },
    }) as unknown as Promise<T>;
  }
}
