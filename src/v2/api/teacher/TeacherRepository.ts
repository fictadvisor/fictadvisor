import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { CreateTeacherDTO } from './dto/CreateTeacherDTO';
import { UpdateTeacherDTO } from './dto/UpdateTeacherDTO';
import { QuestionType } from '@prisma/client';


@Injectable()
export class TeacherRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async getAll (
    body: QueryAllDTO,
  ) {
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

  async getTeacher (
    id: string,
  ) {
    return this.prisma.teacher.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        description: true,
        avatar: true,
        disciplineTeachers: {
          select: {
            id: true,
            roles: {
              select: {
                role: true,
              },
            },
          },
        },
      },
    });
  }

  async delete (
    id: string,
  ) {
    return this.prisma.teacher.delete({
      where: {
        id,
      },
    });
  }

  async find (
    where: CreateTeacherDTO,
  ) {
    return this.prisma.teacher.findFirst({
      where,
    });
  }

  async create (
    data: CreateTeacherDTO,
  ) {
    return this.prisma.teacher.create({
      data,
    });
  }

  async update (id: string, data: UpdateTeacherDTO) {
    return this.prisma.teacher.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        description: true,
        avatar: true,
      },
    });
  }

  async getOrCreate (
    data: CreateTeacherDTO,
  ) {
    let teacher = await this.find(data);

    if (!teacher) {
      teacher = await this.create(data);
    }
    return teacher;
  }

  async getMarksFullData (teacherId: string) {
    return this.prisma.question.findMany({
      where: {
        OR: [{
          type: QuestionType.TOGGLE,
        }, {
          type: QuestionType.SCALE,
        }],
      },
      select: {
        id: true,
        category: true,
        name: true,
        text: true,
        type: true,
        display: true,
        questionAnswers: {
          where: {
            disciplineTeacher: {
              teacherId,
            },
          },
          select: {
            value: true,
          },
        },
      },
    });
  }

  async getMarksWithSubjectId (teacherId: string, subjectId: string) {
    return this.prisma.question.findMany({
      where: {
        OR: [{
          type: QuestionType.TOGGLE,
        }, {
          type: QuestionType.SCALE,
        }],
      },
      select: {
        id: true,
        category: true,
        name: true,
        text: true,
        type: true,
        display: true,
        questionAnswers: {
          where: {
            disciplineTeacher: {
              teacherId,
              discipline: {
                subjectId,
              },
            },
          },
          select: {
            value: true,
          },
        },
      },
    });
  }
  async getMarks (teacherId: string, year: number, semester: number) {
    return this.prisma.question.findMany({
      where: {
        OR: [{
          type: QuestionType.TOGGLE,
        }, {
          type: QuestionType.SCALE,
        }],
      },
      select: {
        id: true,
        category: true,
        name: true,
        text: true,
        display: true,
        questionAnswers: {
          where: {
            disciplineTeacher: {
              teacherId,
              discipline: {
                year,
                semester,
              },
            },
          },
          select: {
            value: true,
          },
        },
      },
    });
  }
}