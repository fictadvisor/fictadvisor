import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { Group, State, User } from '@prisma/client';
import { Request } from 'express';
import { ActionGroupForbiddenException } from '../../utils/exceptions/ActionGroupForbiddenException';
import { InvalidGroupIdException } from '../../utils/exceptions/InvalidGroupIdException';

export abstract class GroupGuard implements CanActivate {

  protected prisma: PrismaService;
  context: ExecutionContext;

  protected constructor (
    prisma: PrismaService
  ) {
    this.prisma = prisma;
  }

  async canActivate (context: ExecutionContext) {
    this.context = context;
    const request = context.switchToHttp().getRequest<Request>();
    const user: User = request.user as User;
    const student = await this.prisma.student.findUnique({
      where: {
        userId: user.id,
      },
    });

    const group = await this.getGroup();

    if (!group) {
      throw new InvalidGroupIdException();
    }

    if (student.state !== State.APPROVED || student.groupId !== group.id) {
      throw new ActionGroupForbiddenException();
    }

    context.switchToHttp().getRequest().group = group;

    return true;
  }

  abstract getGroup(): Promise<Group>;

}