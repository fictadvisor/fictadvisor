import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { FortnightLessonInfoType } from '@prisma/client';
import { CreateTemporaryLessonData } from './dto/CreateTemporaryLessonData';
import { CreateSemesterLessonData } from './dto/CreateSemesterLessonData';

@Injectable()
export class ScheduleRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async createFortnightLesson(lessonId: string, fortnight: number) {
    return await this.prisma.fortnightLesson.create({
      data: {
        lessonId,
        fortnight,
      }
    });
  }

  async getFortnightLesson(lessonId: string, fortnight: number) {
    return await this.prisma.fortnightLesson.findFirst({
      where: {
        lessonId,
        fortnight,
      }
    });
  }

  async getOrCreateFortnightLesson(id, fortnight) {
    let fortnightLesson = await this.getFortnightLesson(id, fortnight);
    if (!fortnightLesson) fortnightLesson = await this.createFortnightLesson(id, fortnight);
    return fortnightLesson;
  }

  async getSemesterLesson(id: string) {
    return await this.prisma.semesterLesson.findUnique({
      where: {
        id
      },
      include: {
        disciplineType: true,
      }
    });
  }

  async getTemporaryLesson(id: string) {
    return await this.prisma.temporaryLesson.findUnique({
      where: {
        id
      },
      include: {
        disciplineType: true,
        teacher: true,
      }
    });
  }

  async getTemporaryLessonsByType(disciplineTypeId: string, fortnight: number) {
    return await this.prisma.temporaryLesson.findMany({
      where: {
        disciplineTypeId,
        fortnight,
      }
    });
  }

  async getSemesterLessonsByType(disciplineTypeId: string) {
    return await this.prisma.semesterLesson.findMany({
      where: {
        disciplineTypeId,
      }
    });
  }

  async getFortnightLessonInfo(lessonId: string, type: FortnightLessonInfoType) {
    return await this.prisma.fortnightLessonInfo.findFirst({
      where: {
        lessonId,
        type,
      }
    });
  }

  async updateOrCreateFortnightLessonInfo(lessonId: string, type: FortnightLessonInfoType, value: string) {
    const fortnightLessonInfo = await this.getFortnightLessonInfo(lessonId, type);
    if (!fortnightLessonInfo) {
      return await this.prisma.fortnightLessonInfo.create({
        data: {
          lessonId,
          type,
          value
        }
      });
    } else {
      return await this.prisma.fortnightLessonInfo.updateMany({
        where: {
          lessonId,
          type
        },
        data: {
          value
        }
      });
    }
  }

  async updateSemesterLessonInfo(id: string, data) {
    return await this.prisma.semesterLesson.update({
      where: {
        id
      },
      data
    })
  }

  async getOrCreateSemesterLesson(data: CreateSemesterLessonData) {
    let lesson = await this.prisma.semesterLesson.findFirst({
      where: data
    });
    if (!lesson) {
      lesson = await this.prisma.semesterLesson.create({
        data
      });
    }
    return lesson;
  }

  async getOrCreateTemporaryLesson(data: CreateTemporaryLessonData) {
    let lesson = await this.prisma.temporaryLesson.findFirst({
      where: data,
    });
    if (!lesson) {
      lesson = await this.prisma.temporaryLesson.create({
        data,
      });
    }
    return lesson;
  }

}