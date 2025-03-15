import { Injectable, PipeTransform } from '@nestjs/common';
import { DisciplineTeacherRepository } from '../../database/v2/repositories/discipline-teacher.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

@Injectable()
export class DisciplineTeacherByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private disciplineTeacherRepository: DisciplineTeacherRepository,
  ) {}

  async transform (disciplineTeacherId: string) : Promise<string> {
    const disciplineTeacher = await this.disciplineTeacherRepository.findById(disciplineTeacherId);
    if (!disciplineTeacher) {
      throw new InvalidEntityIdException('DisciplineTeacher');
    }
    return disciplineTeacherId;
  }
}
