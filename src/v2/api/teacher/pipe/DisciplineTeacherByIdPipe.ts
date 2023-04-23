import { Injectable, PipeTransform } from '@nestjs/common';
import { DisciplineTeacherRepository } from '../DisciplineTeacherRepository';
import { InvalidEntityIdException } from '../../../utils/exceptions/InvalidEntityIdException';

@Injectable()
export class DisciplineTeacherByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private disciplineTeacherRepository: DisciplineTeacherRepository,
  ) {}

  async transform (disciplineTeacherId: string) : Promise<string> {
    const disciplineTeacher = await this.disciplineTeacherRepository.findById(disciplineTeacherId);
    if (!disciplineTeacher) {
      throw new InvalidEntityIdException('disciplineTeacher');
    }
    return disciplineTeacherId;
  }
}
