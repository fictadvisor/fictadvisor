import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { GroupRepository } from '../../api/group/GroupRepository';
import { RequestUtils } from '../../utils/RequestUtils';

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
