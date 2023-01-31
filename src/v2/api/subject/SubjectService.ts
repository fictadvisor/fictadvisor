import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { type CreateSubjectDTO } from './dto/CreateSubjectDTO';
import { type UpdateSubjectDTO } from './dto/UpdateSubjectDTO';
import { SubjectRepository } from './SubjectRepository';
import { type QueryAllDTO } from 'src/v2/utils/QueryAllDTO';

@Injectable()
export class SubjectService {
  constructor (
    private readonly subjectRepository: SubjectRepository,
    private readonly prisma: PrismaService
  ) {}

  async getAll (body: QueryAllDTO) {
    return await this.subjectRepository.getAll(body);
  }

  async get (id: string) {
    return await this.subjectRepository.getSubject(id);
  }

  async create ({ name }: CreateSubjectDTO) {
    return await this.subjectRepository.create(name);
  }

  async update (id: string, body: UpdateSubjectDTO) {
    await this.subjectRepository.update(id, body);
  }

  async deleteSubject (id: string) {
    await this.subjectRepository.delete(id);
  }
}
