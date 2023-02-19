import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DisciplineRepository } from '../../api/discipline/DisciplineRepository';
import { RequestUtils } from '../../utils/RequestUtils';

@Injectable()
export class GroupByDisciplineGuard implements CanActivate {

  constructor(
    private disciplineRepository: DisciplineRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const disciplineId = RequestUtils.get(request, 'disciplineId');
    const group = await this.disciplineRepository.getGroup(disciplineId);
    request.query.groupId = group.id;
    return true;
  }
}