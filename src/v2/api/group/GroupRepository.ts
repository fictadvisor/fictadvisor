import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class GroupRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async get(id: string) {
    return this.prisma.group.findUnique({
      where: {
        id,
      },
      include: {
        disciplines: true,
        students: true,
        groupRole: true,
      },
    });
  }

  async getGroup(id: string) {
    const group = await this.get(id);
    delete group.disciplines;
    delete group.students;
    delete group.groupRole;
    return group;
  }

  async getDisciplines(id: string) {
    const group = await this.get(id);
    return group.disciplines;
  }

  async getStudents(id: string) {
    const group = await this.get(id);
    return group.students;
  }

  async getRoles(groupId: string) {
    const groupRoles = await this.prisma.groupRole.findMany({
      where:{
        groupId,
      },
      include:{
        role: true,
      },
    });
    return groupRoles.map((gr) => (gr.role));
  }

  async find(code: string) {
    return this.prisma.group.findFirst({
      where: {
        code,
      },
    });
  }

  async create(code: string) {
    return this.prisma.group.create({
      data: {
        code,
      },
    });
  }

  async getOrCreate(code: string) {
    let group = await this.find(code);
    if (!group) {
      group = await this.create(code);
    }
    return group;
  }
}