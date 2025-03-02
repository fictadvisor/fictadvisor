import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { GroupRepository } from '../../../database/v2/repositories/GroupRepository';
import { RequestUtils } from '../../helpers/RequestUtils';

@Injectable()
export class GroupByDisciplineGuard implements CanActivate {

  constructor (
    private groupRepository: GroupRepository,
  ) {}

  async canActivate (context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const disciplineId = RequestUtils.get(request, 'disciplineId');
    const group = await this.groupRepository.find({
      disciplines: {
        some: {
          id: disciplineId,
        },
      },
    });
    request.query.groupId = group.id;
    return true;
  }
}
