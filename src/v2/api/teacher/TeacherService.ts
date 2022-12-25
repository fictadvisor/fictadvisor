import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { GetDTO, TeacherFieldsDTO } from './dto/GetDTO';
import { CreateTeacherDTO } from './dto/CreateTeacherDTO';


@Injectable()
export class TeacherService {
  constructor(
    private prisma: PrismaService
  ) {}


  async getAll({ fields = [] }: GetDTO) {
    const teacher: TeacherFieldsDTO = {};
    if (fields.length !== 0) teacher.select = {};

    for (const field of fields) {
      teacher.select[field] = true;
    }

    return await this.prisma.teacher.findMany(teacher);
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