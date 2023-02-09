import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { CreateTeacherDTO } from './dto/CreateTeacherDTO';
import { UpdateTeacherDTO } from './dto/UpdateTeacherDTO';


@Injectable()
export class TeacherRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async get(
    id: string,
  ) {
    return this.prisma.teacher.findUnique({
      where: {
        id,
      },
      include: {
        disciplineTeachers: true,
        temporaryLessons: true,
      },
    });
  }

  async getAll(
    body: QueryAllDTO,
  ){
    const search = DatabaseUtils.getSearch(body, 'firstName', 'lastName', 'middleName');
    const page = DatabaseUtils.getPage(body);
    const sort = DatabaseUtils.getSort(body);

    return this.prisma.teacher.findMany({
      ...page,
      ...sort,
      where: {
        ...search,
      },
    });
  }

  async getTeacher(
    id: string,
  ) {
    const teacher = await this.get(id);
    delete teacher.disciplineTeachers;
    delete teacher.temporaryLessons;
    return teacher;
  }

  async getDisciplineTeachers(
    id: string,
  ) {
    const teacher = await this.get(id);
    return teacher.disciplineTeachers;
  }

  async getTemporaryLessons(
    id: string,
  ) {
    const teacher = await this.get(id);
    return teacher.temporaryLessons;
  }

  async delete(
    id: string,
  ) {
    return this.prisma.teacher.delete({
      where: {
        id,
      },
    });
  }

  async find(
    where: CreateTeacherDTO,
  ) {
    return this.prisma.teacher.findFirst({
      where,
    });
  }

  async create(
    data: CreateTeacherDTO,
  ) {
    return this.prisma.teacher.create({
      data,
    });
  }

  async update(
    id: string,
    data: UpdateTeacherDTO,
  ) {
    return this.prisma.teacher.update({
      where:{
        id,
      },
      data,
    });
  }

  async getOrCreate(
    data: CreateTeacherDTO,
  ) {
    let teacher = await this.find(data);

    if (!teacher) {
      teacher = await this.create(data);
    }
    return teacher;
  }
}