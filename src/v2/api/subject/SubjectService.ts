import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateSubjectDTO } from './dto/CreateSubjectDTO';
import { UpdateSubjectDTO } from './dto/UpdateSubjectDTO';
import { SubjectRepository } from './SubjectRepository';
import { QueryAllDTO } from 'src/v2/utils/QueryAllDTO';

@Injectable()
export class SubjectService {
  constructor(
    private subjectRepository: SubjectRepository,
    private prisma: PrismaService
  ) {}

  async getAll(body: QueryAllDTO) {
    return this.subjectRepository.getAll(body);
  }

  async get(id: string) {
    return this.subjectRepository.getSubject(id);
  }

  async create({ name }: CreateSubjectDTO) {
    return this.subjectRepository.create(name);
  }

  async update(id: string, body: UpdateSubjectDTO) {
    await this.subjectRepository.update(id, body);
  }

  async deleteSubject(id: string) {
    await this.subjectRepository.delete(id);
  }
}