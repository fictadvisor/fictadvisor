import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateDisciplineTypeDTO } from './dto/CreateDisciplineTypeDTO';
import { Prisma } from '@prisma/client';

@Injectable()
export class DisciplineTypeRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async get (id: string) {
    return this.prisma.disciplineType.findUnique({
      where: {
        id,
      },
      include: {
        lessons: true,
        discipline: true,
        disciplineTeacherRoles: true,
      },
    });
  }

  async getType (id: string) {
    return this.prisma.disciplineType.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        discipline: {
          select: {
            id: true,
            group: true,
            subject: true,
            year: true,
            semester: true,
            isSelective: true,
            disciplineTeachers: {
              select: {
                id: true,
                teacher: {
                  select: {
                    id: true,
                    avatar: true,
                    lastName: true,
                    middleName: true,
                    firstName: true,
                    description: true,
                  },
                },
                roles: {
                  select: {
                    role: true,
                  },
                },
              },
            },
          },
        },
        disciplineTeacherRoles: {
          select: {
            role: true,
            disciplineTeacherId: true,
          },
        },
      },
    });
  }

  async getDiscipline (id: string) {
    return this.prisma.discipline.findFirst({
      where: {
        disciplineTypes: {
          some: {
            id,
          },
        },
      },
      select: {
        id: true,
        group: true,
        subject: true,
        year: true,
        semester: true,
        isSelective: true,
        disciplineTeachers: {
          select: {
            id: true,
            teacher: {
              select: {
                id: true,
                avatar: true,
                lastName: true,
                middleName: true,
                firstName: true,
                description: true,
              },
            },
            roles: {
              select: {
                role: true,
              },
            },
          },
        },
      },
    });
  }

  async getDisciplineTeachers (disciplineTypeId: string) {
    return this.prisma.disciplineTeacher.findMany({
      where: {
        roles: {
          some: {
            disciplineTypeId,
          },
        },
      },
      select: {
        id: true,
        teacher: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
            avatar: true,
          },
        },
        roles: {
          select: {
            role: true,
          },
        },
      },
    });
  }

  async getDisciplineTeacherRoles (id: string) {
    const type = await this.get(id);
    return type.disciplineTeacherRoles;
  }

  async getLessons (id: string) {
    const type = await this.get(id);
    return type.lessons;
  }

  async create (data: Prisma.DisciplineTypeUncheckedCreateInput) {
    return this.prisma.disciplineType.create({
      data,
    });
  }

  async delete (id: string) {
    return this.prisma.disciplineType.delete({
      where: {
        id,
      },
    });
  }

  async findType (data: CreateDisciplineTypeDTO) {
    return this.prisma.disciplineType.findFirst({
      where: data,
    });
  }

  async getOrCreate (body: CreateDisciplineTypeDTO) {
    let type = await this.findType(body);
    if (!type) {
      type = await this.create(body);
    }
    return type;
  }

  async deleteDisciplineTeacherRoles (disciplineTypeId: string) {
    return this.prisma.disciplineTeacherRole.deleteMany({
      where: {
        disciplineTypeId,
      },
    });
  }
}
