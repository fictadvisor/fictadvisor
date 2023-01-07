import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { GetDTO, TeacherFieldsDTO } from './dto/GetDTO';
import { CreateTeacherDTO } from './dto/CreateTeacherDTO';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { TeacherRole } from '@prisma/client';
import { CreateDisciplineTeacherData } from './dto/CreateDisciplineTeacherData';


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

  async getByType(id: string) {
    const disciplineType = await this.prisma.disciplineType.findUnique({
      where: {
        id
      },
      include: {
        disciplineTeachers: {
          include: {
            teacher: true,
          }
        }
      }
    });

    return disciplineType.disciplineTeachers.map(dt => dt.teacher);
  }

  async deleteByType(disciplineTypeId: string) {
    return await this.prisma.disciplineTeacher.deleteMany({
      where: {
        disciplineTypeId
      }
    });
  }

  async createDisciplineTeacher(teacherId: string, disciplineTypeId: string, role: TeacherRole) {
    return await this.prisma.disciplineTeacher.create({
      data: {
        teacherId,
        disciplineTypeId,
        role
      }
    });
  }

  async getOrCreateDisciplineTeacher(data: CreateDisciplineTeacherData) {
    let teacher = await this.prisma.disciplineTeacher.findFirst({
      where: data,
    });
    if (!teacher) {
      teacher = await this.prisma.disciplineTeacher.create({
        data,
      });
    }
    return teacher;
  }
}