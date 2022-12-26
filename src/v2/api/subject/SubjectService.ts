import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { GetDTO } from '../teacher/dto/GetDTO';
import { CreateSubjectDTO } from './dto/CreateSubjectDTO';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { SubjectFieldsDTO } from './dto/SubjectFieldsDTO';

@Injectable()
export class SubjectService {
  constructor(
    private prisma: PrismaService
  ) {}

  async getAll({ fields }: GetDTO) {
    const subject = DatabaseUtils.getSelectObject<SubjectFieldsDTO>(fields);

    return await this.prisma.subject.findMany(subject);
  }

  async get(id: string) {
    return await this.prisma.subject.findUnique({
      where: {
        id
      }
    });
  }

  async create({ name }: CreateSubjectDTO) {
    return await this.prisma.subject.create({
      data:  {
        name
      }
    });
  }
}