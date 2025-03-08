import { Injectable, PipeTransform } from '@nestjs/common';
import { DisciplineTeacherRepository } from '../../database/v2/repositories/DisciplineTeacherRepository';
import { InvalidEntityIdException } from '../exceptions/InvalidEntityIdException';

@Injectable()
export class DisciplineTeacherByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private disciplineTeacherRepository: DisciplineTeacherRepository,
  ) {}

  async transform (id: string) : Promise<string> {
    const disciplineTeacher = await this.disciplineTeacherRepository.findOne({ id });
    if (!disciplineTeacher) {
      throw new InvalidEntityIdException('DisciplineTeacher');
    }
    return id;
  }
}
