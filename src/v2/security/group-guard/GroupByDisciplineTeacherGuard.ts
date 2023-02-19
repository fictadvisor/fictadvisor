import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DisciplineTeacherService } from '../../api/teacher/DisciplineTeacherService';
import { RequestUtils } from '../../utils/RequestUtils';

@Injectable()
export class GroupByDisciplineTeacherGuard implements CanActivate{

  constructor(
    private disciplineTeacherService: DisciplineTeacherService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const disciplineTeacherId = RequestUtils.get(request, 'disciplineTeacherId');
    const group = await this.disciplineTeacherService.getGroup(disciplineTeacherId);
    request.query.groupId = group.id;
    return true;
  }
}