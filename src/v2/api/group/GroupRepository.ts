import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { Prisma } from '@prisma/client';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { UpdateGroupDTO } from './dto/UpdateGroupDTO';

@Injectable()
export class GroupRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async get (id: string) {
    return this.prisma.group.findUnique({
      where: {
        id,
      },
      include: {
        disciplines: true,
        students: true,
        groupRoles: true,
      },
    });
  }

  async getAll (body: QueryAllDTO) {
    const search = DatabaseUtils.getSearch(body, 'code');
    const page = DatabaseUtils.getPage(body);
    const sort = DatabaseUtils.getSort(body);

    return this.prisma.group.findMany({
      ...page,
      ...sort,
      where: {
        ...search,
      },
    });
  }

  async delete (id: string) {
    return this.prisma.group.delete({
      where: {
        id,
      },
    });
  }

  async getGroup (id: string) {
    return this.prisma.group.findUnique({
      where: {
        id,
      },
    });
  }

  async getDisciplines (groupId: string) {
    return this.prisma.discipline.findMany({
      where: {
        groupId,
      },
      select: {
        id: true,
        isSelective: true,
        year: true,
        semester: true,
        subject: true,
        group: true,
        disciplineTypes: {
          select: {
            id: true,
            name: true,
          },
        },
        disciplineTeachers: {
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
        },
      },
    });
  }

  async getStudents (groupId: string) {
    return this.prisma.student.findMany({
      where: {
        groupId,
      },
      select: {
        firstName: true,
        middleName: true,
        lastName: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            telegramId: true,
            avatar: true,
            state: true,
          },
        },
        group: true,
        roles: {
          select: {
            role: true,
          },
        },
        state: true,
      },
    });
  }

  async addRole (roleId: string, groupId: string) {
    return this.prisma.groupRole.create({
      data: {
        roleId: roleId,
        groupId: groupId,
      },
    });
  }

  async getRoles (groupId: string) {
    return this.prisma.role.findMany({
      where: {
        groupRole: {
          groupId,
        },
      },
    });
  }

  async find (where: Prisma.GroupWhereInput) {
    return this.prisma.group.findFirst({
      where,
    });
  }

  async create (code: string) {
    return this.prisma.group.create({
      data: {
        code,
      },
    });
  }

  async getOrCreate (code: string) {
    let group = await this.find({ code });
    if (!group) {
      group = await this.create(code);
    }
    return group;
  }

  async updateGroup (id: string, data: UpdateGroupDTO) {
    return this.prisma.group.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        code: true,
      },
    });
  }

  async deleteRoles (groupId: string) {
    return this.prisma.role.deleteMany({
      where: {
        groupRole: {
          groupId,
        },
      },
    });
  }
}
