import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { GetDTO, TeacherFieldsDTO } from './dto/GetDTO';
import { CreateTeacherDTO } from './dto/CreateTeacherDTO';
import { DatabaseUtils } from '../utils/DatabaseUtils';


@Injectable()
export class TeacherService {
  constructor(
    private prisma: PrismaService
  ) {}


  async getAll({ fields }: GetDTO) {
    const select = DatabaseUtils.getSelectObject<TeacherFieldsDTO>(fields);

    return await this.prisma.teacher.findMany(select);
  }

  async create(body: CreateTeacherDTO) {
    return await this.prisma.teacher.create({
      data: body,
    })
  }

  async get(id: string) {
    return await this.prisma.teacher.findUnique({
      where: {
        id,
      }
    })
  }
}