import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';

@Injectable()
export class MultipleAccessGuard implements CanActivate {
  constructor (
    private reflector: Reflector,
    private moduleRef: ModuleRef,
  ) {}

  async canActivate (context: ExecutionContext) {
    const accessGuards = this.reflector.get('multipleAccess', context.getHandler());
    const guards = accessGuards.map((guard) => this.moduleRef.get(guard, { strict: false }));

    for (let i = 0; i < guards.length; i++) {
      let status;
      
      try {
        status = await guards[i].canActivate(context);
      } catch (error) {
        status = false;
      }

      if (status) return true;
    }

    throw new UnauthorizedException();
  }
}
