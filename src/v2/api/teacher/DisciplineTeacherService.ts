import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TeacherService } from './TeacherService';
import { DisciplineTeacherRepository } from './DisciplineTeacherRepository';
import { DisciplineTypeService } from '../discipline/DisciplineTypeService';
import { DisciplineTypeRepository } from '../discipline/DisciplineTypeRepository';

@Injectable()
export class DisciplineTeacherService {
  constructor(
    @Inject(forwardRef(() => TeacherService))
    private teacherService: TeacherService,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTypeRepository: DisciplineTypeRepository,
    @Inject(forwardRef(() => DisciplineTypeService))
    private disciplineTypeService: DisciplineTypeService,
  ) {}

  async getTeacher(id: string) {
    const disciplineTeacher = await this.disciplineTeacherRepository.get(id);

    return {
      disciplineTeacherId: disciplineTeacher.id,
      roles: [disciplineTeacher.role],
      ...disciplineTeacher.teacher,
    };
  }

  async getDiscipline(id: string) {
    const disciplineType = await this.disciplineTeacherRepository.getDisciplineType(id);
    return this.disciplineTypeRepository.getDiscipline(disciplineType.id);
  }

  async getGroup(id: string) {
    const disciplineType = await this.disciplineTeacherRepository.getDisciplineType(id);
    return this.disciplineTypeService.getGroup(disciplineType.id);
  }

}
