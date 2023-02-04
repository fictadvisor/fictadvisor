import { Injectable } from '@nestjs/common';
import { CreateSubjectDTO } from './dto/CreateSubjectDTO';
import { UpdateSubjectDTO } from './dto/UpdateSubjectDTO';
import { SubjectRepository } from './SubjectRepository';
import { QueryAllDTO } from 'src/v2/utils/QueryAllDTO';
import { DisciplineService } from '../discipline/DisciplineService';

@Injectable()
export class SubjectService {
  constructor (
    private subjectRepository: SubjectRepository,
    private disciplineService: DisciplineService,
  ) {}

  async getAll (body: QueryAllDTO) {
    const subjects = await this.subjectRepository.getAll(body);
    const results = [];

    for (const subject of subjects) {
      const teachersAmount = (await this.getSubjectTeachers(subject.id)).length;
      results.push({
        id: subject.id,
        name: subject.name,
        amount: teachersAmount,
      });
    }

    return {
      subjects: results,
    };
  }

  async get (id: string) {
    return this.subjectRepository.getSubject(id);
  }

  async getTeachers (id: string) {
    const subjectName = (await this.subjectRepository.getSubject(id)).name;
    const teachers = this.getSubjectTeachers(id);
    return {
      subjectName,
      teachers,
    };
  }

  async getSubjectTeachers (id: string) {
    const  results = [];
    const disciplines = await this.subjectRepository.getDisciplines(id);

    for (const discipline of disciplines) {
      const teachers = await this.disciplineService.getTeachers(discipline.id);

      for (const teacher of teachers) {
        const result = results.find((t) => t.id === teacher.id);
        if (result) {
          for (const role of teacher.roles) {
            if (!result.roles.includes(role)) 
              result.roles.push(role);
          }
        } else {
          delete teacher.description;
          delete teacher.disciplineTeacherId;
          results.push(teacher);
        }
      }
    }
    return results;
  }

  async create ({ name }: CreateSubjectDTO) {
    return this.subjectRepository.create(name);
  }

  async update (id: string, body: UpdateSubjectDTO) {
    await this.subjectRepository.update(id, body);
  }

  async deleteSubject (id: string) {
    await this.subjectRepository.delete(id);
  }
}