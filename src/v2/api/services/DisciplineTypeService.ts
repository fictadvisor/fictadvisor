import { Injectable } from '@nestjs/common';
import { DisciplineTypeRepository } from '../../database/repositories/DisciplineTypeRepository';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';

@Injectable()
export class DisciplineTypeService {
  constructor (
    private disciplineTypeRepository: DisciplineTypeRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
  ) {}

  async getGroup (id: string) {
    const discipline = await this.disciplineTypeRepository.getDiscipline(id);
    return discipline.group;
  }


  async deleteDisciplineTeachers (id: string) {
    const roles = await this.disciplineTypeRepository.getDisciplineTeacherRoles(id);
    for (const role of roles) {
      await this.disciplineTeacherRepository.deleteById(role.disciplineTeacherId);
    }
  }
}