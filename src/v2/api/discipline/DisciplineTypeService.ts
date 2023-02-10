import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DisciplineTypeRepository } from './DisciplineTypeRepository';
import { TeacherService } from '../teacher/TeacherService';
import { DisciplineTeacherService } from '../teacher/DisciplineTeacherService';
import { DisciplineRepository } from './DisciplineRepository';
import { DisciplineTeacherRepository } from '../teacher/DisciplineTeacherRepository';

@Injectable()
export class DisciplineTypeService {
  constructor(
    private disciplineTypeRepository: DisciplineTypeRepository,
    private disciplineRepository: DisciplineRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    @Inject(forwardRef(() => DisciplineTeacherService))
    private disciplineTeacherService: DisciplineTeacherService,
    @Inject(forwardRef(() => TeacherService))
    private teacherService: TeacherService
  ) {}

  async getTeachers(id: string) {
    const teachers = await this.disciplineTypeRepository.getDisciplineTeachers(id);
    return this.disciplineTeacherService.getTeachers(teachers);
  }

  async getGroup(id: string) {
    const discipline = await this.disciplineTypeRepository.getDiscipline(id);
    return this.disciplineRepository.getGroup(discipline.id);
  }


  async deleteDisciplineTeachers(id: string) {
    const roles = await this.disciplineTypeRepository.getDisciplineTeacherRoles(id);
    for (const role of roles) {
      await this.disciplineTeacherRepository.delete(role.disciplineTeacherId);
    }
  }
}