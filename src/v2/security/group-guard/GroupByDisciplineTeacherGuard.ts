import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RequestUtils } from '../../utils/RequestUtils';
import { DisciplineTeacherRepository } from 'src/v2/database/repositories/DisciplineTeacherRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';

@Injectable()
export class GroupByDisciplineTeacherGuard implements CanActivate {

  constructor (
    private disciplineTeacherRepository: DisciplineTeacherRepository
  ) {}

  async canActivate (context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const disciplineTeacherId = RequestUtils.get(request, 'disciplineTeacherId');
    const teacher = await this.disciplineTeacherRepository.findById(disciplineTeacherId);
    if (!teacher) {
      throw new InvalidEntityIdException('Discipline teacher');
    }
    request.query.groupId = teacher.discipline.group.id;
    return true;
  }
}
