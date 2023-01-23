import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { GetDTO } from '../teacher/dto/GetDTO';
import { CreateSubjectDTO } from './dto/CreateSubjectDTO';
import { Subject } from '@prisma/client';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { SubjectRepository } from './SubjectRepository';

@Injectable()
export class SubjectService {
  constructor(
    private subjectRepository: SubjectRepository,
    private prisma: PrismaService
  ) {}

  async getAll(body: GetDTO<Subject>) {
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

  async get(id: string) {
    return await this.prisma.subject.findUnique({
      where: {
        id,
      },
    });
  }

  async create({ name }: CreateSubjectDTO) {
    return await this.prisma.subject.create({
      data:  {
        name,
      },
    });
  }

  async deleteSubject(id: string) {
    await this.subjectRepository.delete(id);
  }
}