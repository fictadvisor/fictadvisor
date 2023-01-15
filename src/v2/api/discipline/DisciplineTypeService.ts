import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DisciplineTypeRepository } from './DisciplineTypeRepository';
import { TeacherService } from '../teacher/TeacherService';
import { DisciplineTeacherService } from '../teacher/DisciplineTeacherService';
import { DisciplineRepository } from './DisciplineRepository';

@Injectable()
export class DisciplineTypeService {
  constructor(
    private disciplineTypeRepository: DisciplineTypeRepository,
    private disciplineRepository: DisciplineRepository,
    @Inject(forwardRef(() => DisciplineTeacherService))
    private disciplineTeachersService: DisciplineTeacherService,
    @Inject(forwardRef(() => TeacherService))
    private teacherService: TeacherService
  ) {}

  async getTeachers(id: string) {
    const teachers = await this.disciplineTypeRepository.getDisciplineTeachers(id);
    const results = [];

    for (const teacher of teachers) {
      results.push(await this.disciplineTeachersService.getTeacher(teacher.id));
    }

    return results;
  }

  async getGroup(id: string) {
    const discipline = await this.disciplineTypeRepository.getDiscipline(id);
    return this.disciplineRepository.getGroup(discipline.id);
  }



}