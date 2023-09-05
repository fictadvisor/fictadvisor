import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { GroupRepository } from '../../database/repositories/GroupRepository';
import { RequestUtils } from '../../utils/RequestUtils';
import { DataNotFoundException } from '../../utils/exceptions/DataNotFoundException';

@Injectable()
export class GroupByEventGuard implements CanActivate {

  constructor (
    private groupRepository: GroupRepository,
  ) {}

  async canActivate (context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const eventId = RequestUtils.get(request, 'eventId');
    const group = await this.groupRepository.find({
      events: {
        some: {
          id: eventId,
        },
      },
    });
    if (!group) throw new DataNotFoundException();
    request.query.groupId = group.id;
    return true;
  }
}
