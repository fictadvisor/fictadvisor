import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RequestUtil } from '../../../utils/request.util';
import { DisciplineTeacherRepository } from '../../../../database/v2/repositories/discipline-teacher.repository';
import { InvalidEntityIdException } from '../../../exceptions/invalid-entity-id.exception';

@Injectable()
export class GroupByDisciplineTeacherGuard implements CanActivate {

  constructor (
    private disciplineTeacherRepository: DisciplineTeacherRepository
  ) {}

  async canActivate (context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const id = RequestUtil.get(request, 'disciplineTeacherId');
    const teacher = await this.disciplineTeacherRepository.findOne({ id });
    if (!teacher) {
      throw new InvalidEntityIdException('Discipline teacher');
    }
    // Express 5's req.query is a getter that returns a fresh parsed object on
    // each access, so mutating it doesn't persist to the PermissionGuard. Write
    // to req.params (a stable object) — RequestUtil.get reads query ?? params ?? body.
    request.params.groupId = teacher.discipline.group.id;
    return true;
  }
}
