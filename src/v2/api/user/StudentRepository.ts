import { Injectable } from '@nestjs/common';
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
}