import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { ScheduleParser } from '../../utils/parser/ScheduleParser';
import { Group, Subject, FortnightLessonInfoType, Discipline, DisciplineType } from '@prisma/client';
import { DateService } from '../../utils/date/DateService';
import { ConfigService } from '@nestjs/config';
import { SubjectService } from '../subject/SubjectService';
import { DisciplineService } from '../discipline/DisciplineService';
import { TemporaryLessonInfo } from './dto/TemporaryLessonInfo';
import { StaticLessonInfo } from './dto/StaticLessonInfo';
import { FullLessonDTO } from './dto/FullLessonDTO';
import { TeacherService } from '../teacher/TeacherService';
import { UpdateDynamicInfoDTO } from './dto/UpdateDynamicInfoDTO';
import { ScheduleRepository } from './ScheduleRepository';
import { FortnightInfoAdaptor } from './dto/FortnightInfoAdaptor';

@Injectable()
export class ScheduleService {
  constructor(
    private scheduleParser: ScheduleParser,
    private prisma: PrismaService,
    private dateService: DateService,
    private config: ConfigService,
    private subjectService: SubjectService,
    private disciplineService: DisciplineService,
    private teacherService: TeacherService,
    private scheduleRepository: ScheduleRepository,
  ) {}


  async parse(parserType: string) {
    switch (parserType) {
      case 'rozkpi':
      case 'schedule':
        await this.scheduleParser.parse();
        break;
    }
  }

  async getSchedule(group: Group, fortnight: number, callback: 'static' | 'temporary'): Promise<StaticLessonInfo[] | TemporaryLessonInfo[]> {
    const results = [];

    const disciplines = await this.disciplineService.getByGroup(group.id);

    for (const discipline of disciplines) {
      const disciplineTypes = await this.disciplineService.getTypes(discipline.id);
      const subject = await this.subjectService.get(discipline.subjectId);

      for (const type of disciplineTypes) {
        switch (callback) {
          case 'static':
            results.push(...await this.getStaticLessons(fortnight, discipline, subject, type))
            break;
          case 'temporary':
            results.push(...await this.getTemporaryLessons(fortnight, discipline, subject, type));
            break;
        }
      }
    }

    return results;
  }

  async getStaticLessons(fortnight: number, discipline: Discipline, subject: Subject, type: DisciplineType): Promise<StaticLessonInfo[]> {
    const lessons = await this.scheduleRepository.getSemesterLessonsByType(type.id);
    const results: StaticLessonInfo[] = [];

    for (const lesson of lessons) {
      const [
        startDate = lesson.startDate,
        endDate = lesson.endDate,
        isTest = false,
      ] = await this.getWeekLessonInfos(
        lesson.id, fortnight,
        FortnightLessonInfoType.START_DATE,
        FortnightLessonInfoType.END_DATE,
        FortnightLessonInfoType.IS_TEST,
      );

      results.push({
        id: lesson.id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        type: type.name,
        subjectName: subject.name,
        isSelective: discipline.isSelective,
        isTest: Boolean(isTest),
      })
    }

    return results;
  }

  async getWeekLessonInfos(lessonId: string, fortnight: number, ...types: FortnightLessonInfoType[]): Promise<string[]> {
    const weekLesson = await this.scheduleRepository.getFortnightLesson(lessonId, fortnight);
    const values = [];

    if (!weekLesson) return values;

    for (const type of types) {
      const info = await this.scheduleRepository.getFortnightLessonInfo(weekLesson.id, type);
      values.push(info?.value);
    }

    return values;
  }

  async getTemporaryLessons(fortnight: number, discipline: Discipline, subject: Subject, type: DisciplineType): Promise<TemporaryLessonInfo[]> {
    const lessons = await this.scheduleRepository.getTemporaryLessonsByType(type.id, fortnight);

    const results: TemporaryLessonInfo[] = [];

    for (const lesson of lessons) {
      results.push({
        id: lesson.id,
        startDate: lesson.startDate,
        endDate: lesson.endDate,
        type: type.name,
        subjectName: subject.name,
      })
    }

    return results;
  }

  async getFullStaticLesson(id: string, fortnight: number): Promise<FullLessonDTO> {
    const lesson = await this.scheduleRepository.getSemesterLesson(id);
    const dbTeachers = await this.teacherService.getByType(lesson.disciplineTypeId);
    const discipline = await this.disciplineService.getByType(lesson.disciplineTypeId);
    const teachers = dbTeachers.map(t => ({
      id: t.id,
      name: `${t.lastName} ${t.firstName} ${t.middleName}`
    }));
    const subject = await this.subjectService.get(discipline.subjectId);
    const [
      url = lesson.url,
      startDate = lesson.startDate,
      endDate = lesson.endDate,
      comment = null,
      isTest = false,
      homework = null,
    ] = await this.getWeekLessonInfos(
      lesson.id, fortnight,
      FortnightLessonInfoType.URL,
      FortnightLessonInfoType.START_DATE,
      FortnightLessonInfoType.END_DATE,
      FortnightLessonInfoType.COMMENT,
      FortnightLessonInfoType.IS_TEST,
      FortnightLessonInfoType.HOMEWORK
    );

    return {
      id: lesson.id,
      subject,
      teachers,
      url,
      comment,
      homework,
      type: lesson.disciplineType.name,
      resources: discipline.resource,
      evaluatingSystem: discipline.evaluatingSystem,
      isSelective: discipline.isSelective,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      isTest: Boolean(isTest),
    }
  }

  async getFullTemporaryLesson(id: string): Promise<FullLessonDTO> {
    const lesson = await this.scheduleRepository.getTemporaryLesson(id);
    const teacher = lesson.teacher;
    const discipline = await this.disciplineService.getByType(lesson.disciplineTypeId);
    const subject = await this.subjectService.get(discipline.id);
    const teacherFullName = `${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`;

    return {
      id: lesson.id,
      subject,
      teachers: [{
        id: teacher.id,
        name: teacherFullName
      }],
      type: lesson.disciplineType.name,
      url: lesson.url,
      resources: discipline.resource,
      evaluatingSystem: discipline.evaluatingSystem,
      isSelective: discipline.isSelective,
      startDate: lesson.startDate,
      endDate: lesson.endDate,
    }
  }

  async updateFortnightInfo(id, fortnight, data: UpdateDynamicInfoDTO) {
    const fortnightLesson = await this.scheduleRepository.getOrCreateFortnightLesson(id, fortnight);
    if (!fortnightLesson) return null;

    for (const key in data) {
      await this.scheduleRepository.updateOrCreateFortnightLessonInfo(fortnightLesson.id, FortnightInfoAdaptor[key], data[key]);
    }
  }
}