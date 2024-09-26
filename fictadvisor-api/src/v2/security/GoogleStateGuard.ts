import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../database/PrismaService';
import { UserRepository } from '../database/repositories/UserRepository';

@Injectable()
export class GoogleStateGuard implements CanActivate {
  constructor (
    private userRepository: UserRepository,
    private prisma: PrismaService,
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const state: string = req.query.state as string;

    const token = await this.prisma.googleStateToken.findUnique({
      where: {
        token: state,
      },
    });
    if (!token) return false;

    await this.prisma.googleStateToken.delete({
      where: {
        token: token.token,
      },
    });

    const user = await this.userRepository.findById(token.userId);
    if (!user) return false;

    delete user.password;
    req.user = user;
    return true;
  }
}
