import { Injectable } from '@nestjs/common';
import { type Subject } from '@prisma/client';
import { type QueryAllDTO } from 'src/v2/utils/QueryAllDTO';
import { PrismaService } from '../../database/PrismaService';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { type UpdateSubjectDTO } from './dto/UpdateSubjectDTO';

@Injectable()
export class SubjectRepository {
  constructor (
    private readonly prisma: PrismaService
  ) {}

  async find (name: string) {
    return await this.prisma.subject.findFirst({
      where: {
        name,
      },
    });
  }

  async create (name: string) {
    return await this.prisma.subject.create({
      data: {
        name,
      },
    });
  }

  async getOrCreate (name: string) {
    let subject = await this.find(name);
    if (!subject) {
      subject = await this.create(name);
    }
    return subject;
  }

  async get (id: string) {
    return await this.prisma.subject.findUnique({
      where: {
        id,
      },
      include: {
        disciplines: true,
      },
    });
  }

  async getAll (body: QueryAllDTO) {
    const search = DatabaseUtils.getSearch<Subject>(body, 'name');
    const page = DatabaseUtils.getPage(body);
    const sort = DatabaseUtils.getSort(body);

    return await this.prisma.subject.findMany({
      ...page,
      ...sort,
      where: {
        ...search,
      },
    });
  }

  async getDisciplines (id: string) {
    const subject = await this.get(id);
    return subject.disciplines;
  }

  async getSubject (id: string) {
    const subject = await this.get(id);
    delete subject.disciplines;
    return subject;
  }

  async update (id: string, data: UpdateSubjectDTO) {
    return await this.prisma.subject.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete (id: string) {
    return await this.prisma.subject.delete({
      where: {
        id,
      },
    });
  }
}
