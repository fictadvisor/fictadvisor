import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { GroupRepository } from '../../../../database/v2/repositories/group.repository';
import { RequestUtil } from '../../../utils/request.util';

@Injectable()
export class GroupByDisciplineGuard implements CanActivate {
  constructor (private groupRepository: GroupRepository) {}

  async canActivate (context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const disciplineId = RequestUtil.get(request, 'disciplineId');
    const group = await this.groupRepository.findOne({
      disciplines: {
        some: {
          id: disciplineId,
        },
      },
    });
    // Express 5's req.query is a getter that returns a fresh parsed object on
    // each access, so mutating it doesn't persist to the PermissionGuard. Write
    // to req.params (a stable object) — RequestUtil.get reads query ?? params ?? body.
    request.params.groupId = group.id;
    return true;
  }
}
