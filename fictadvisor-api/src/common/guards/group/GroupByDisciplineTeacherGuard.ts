import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RequestUtils } from '../../helpers/RequestUtils';
import { DisciplineTeacherRepository } from '../../../database/v2/repositories/DisciplineTeacherRepository';
import { InvalidEntityIdException } from '../../exceptions/InvalidEntityIdException';

@Injectable()
export class GroupByDisciplineTeacherGuard implements CanActivate {

  constructor (
    private disciplineTeacherRepository: DisciplineTeacherRepository
  ) {}

  async canActivate (context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const id = RequestUtils.get(request, 'disciplineTeacherId');
    const teacher = await this.disciplineTeacherRepository.findOne({ id });
    if (!teacher) {
      throw new InvalidEntityIdException('Discipline teacher');
    }
    request.query.groupId = teacher.discipline.group.id;
    return true;
  }
}
