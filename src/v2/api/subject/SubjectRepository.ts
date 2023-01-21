import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class SubjectRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async find(name: string) {
    return this.prisma.subject.findFirst({
      where: {
        name,
      },
    });
  }

  async create(name: string) {
    return this.prisma.subject.create({
      data: {
        name,
      },
    });
  }

  async getOrCreate(name: string) {
    let subject = await this.find(name);
    if (!subject) {
      subject = await this.create(name);
    }
    return subject;
  }

  async get(id: string) {
    return this.prisma.subject.findUnique({
      where: {
        id,
      },
      include: {
        disciplines: true,
      },
    });
  }

  async getDisciplines(id: string) {
    const subject = await this.get(id);
    return subject.disciplines;
  }

  async getSubject(id: string) {
    const subject = await this.get(id);
    delete subject.disciplines;
    return subject;
  }

  async delete(id: string) {
    return this.prisma.subject.delete({
      where: {
        id,
      },
    });
  }
}