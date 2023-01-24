import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { GetDTO } from '../teacher/dto/GetDTO';
import { CreateSubjectDTO } from './dto/CreateSubjectDTO';
import { UpdateSubjectDTO } from './dto/UpdateSubjectDTO';
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
    return await this.subjectRepository.getSubject(id);
  }

  async create({ name }: CreateSubjectDTO) {
    await this.subjectRepository.create(name);
  }

  async update(id: string, body: UpdateSubjectDTO) {
    await this.subjectRepository.update(id, body);
  }

  async deleteSubject(id: string) {
    await this.subjectRepository.delete(id);
  }
}