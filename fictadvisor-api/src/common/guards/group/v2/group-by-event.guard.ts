import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { GroupRepository } from '../../../../database/v2/repositories/group.repository';
import { RequestUtil } from '../../../utils/request.util';
import { DataNotFoundException } from '../../../exceptions/data-not-found.exception';

@Injectable()
export class GroupByEventGuard implements CanActivate {
  constructor (
    private groupRepository: GroupRepository,
  ) {}

  async canActivate (context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const eventId = RequestUtil.get(request, 'eventId');
    const group = await this.groupRepository.findOne({
      events: {
        some: {
          id: eventId,
        },
      },
    });
    if (!group) throw new DataNotFoundException();
    // Express 5's req.query is a getter that returns a fresh parsed object on
    // each access, so mutating it doesn't persist to the PermissionGuard. Write
    // to req.params (a stable object) — RequestUtil.get reads query ?? params ?? body.
    request.params.groupId = group.id;
    return true;
  }
}
