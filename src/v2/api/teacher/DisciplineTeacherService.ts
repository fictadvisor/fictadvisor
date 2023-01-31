import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TeacherService } from './TeacherService';
import { DisciplineTeacherRepository } from './DisciplineTeacherRepository';
import { DisciplineTypeService } from '../discipline/DisciplineTypeService';
import { DisciplineTypeRepository } from '../discipline/DisciplineTypeRepository';

@Injectable()
export class DisciplineTeacherService {
  constructor (
    @Inject(forwardRef(() => TeacherService))
    private readonly teacherService: TeacherService,
    private readonly disciplineTeacherRepository: DisciplineTeacherRepository,
    private readonly disciplineTypeRepository: DisciplineTypeRepository,
    @Inject(forwardRef(() => DisciplineTypeService))
    private readonly disciplineTypeService: DisciplineTypeService
  ) {}

  async getGroup (id: string) {
    const roles = await this.disciplineTeacherRepository.getRoles(id);
    return await this.disciplineTypeService.getGroup(roles[0].disciplineTypeId);
  }

  async getDisciplineTeacher (disciplineTeacherId: string) {
    const teacher = await this.disciplineTeacherRepository.getTeacher(disciplineTeacherId);
    const roles = await this.disciplineTeacherRepository.getRoles(disciplineTeacherId);

    return {
      ...teacher,
      disciplineTeacherId,
      roles: roles.map((role) => (role.role)),
    };
  }
}
