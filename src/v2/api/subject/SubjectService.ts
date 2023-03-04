import { Injectable } from '@nestjs/common';
import { CreateSubjectDTO } from './dto/CreateSubjectDTO';
import { UpdateSubjectDTO } from './dto/UpdateSubjectDTO';
import { SubjectRepository } from './SubjectRepository';
import { QueryAllSubjectDTO } from './query/QueryAllSubjectDTO';
import { DisciplineTeacherService } from '../teacher/DisciplineTeacherService';

@Injectable()
export class SubjectService {
  constructor (
    private subjectRepository: SubjectRepository,
    private disciplineTeacherService: DisciplineTeacherService,
  ) {}

  async getAll (body: QueryAllSubjectDTO) {
    const subjects = await this.subjectRepository.getAll(body);
    const results = [];

    for (const subject of subjects) {
      const amount = await this.subjectRepository.countTeachers(subject.id);
      results.push({
        id: subject.id,
        name: subject.name,
        amount,
      });
    }

    return results;
  }

  async get (id: string) {
    return this.subjectRepository.getSubject(id);
  }

  async getTeachers (id: string) {
    const subjectName = (await this.subjectRepository.getSubject(id)).name;
    const dbTeachers = await this.subjectRepository.getTeachers(id);

    const teachers = [];

    for (const { disciplineTeachers, ...teacher } of dbTeachers) {
      const roles = this.disciplineTeacherService.getUniqueRoles(disciplineTeachers);

      teachers.push({
        ...teacher,
        roles,
      });
    }

    return {
      subjectName,
      teachers,
    };
  }

  async create (body: CreateSubjectDTO) {
    return this.subjectRepository.create(body);
  }

  async update (id: string, body: UpdateSubjectDTO) {
    return this.subjectRepository.update(id, body);
  }

  async deleteSubject (id: string) {
    await this.subjectRepository.delete(id);
  }
}