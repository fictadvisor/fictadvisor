import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ServiceException } from 'src/v1/common/common.exception';
import { User, UserRole } from 'src/v1/database/entities/user.entity';

type TelegramAuthenticationParams = {
  telegram: true;
};

type OAuthAuthenticationParams = {
  telegram?: false;
  roles?: UserRole[];
};

export type AuthorizeParams =
  | TelegramAuthenticationParams
  | OAuthAuthenticationParams;

export const Authorize = (params: AuthorizeParams = {}) => {
  if (params.telegram == true) {
    return applyDecorators(UseGuards(TelegramAuthorizationGuard));
  }

  return applyDecorators(
    SetMetadata('oauth.roles', params.roles ?? Object.values(UserRole)),
    UseGuards(OAuthAuthorizationGuard)
  );
};

@Injectable()
export class TelegramAuthorizationGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const [realm, token] = (request.headers.authorization ?? '').split(' ');

    if (
      realm != 'Telegram' ||
      token != this.configService.get<string>('telegram.botToken')
    ) {
      throw ServiceException.create(HttpStatus.UNAUTHORIZED, {
        message: 'You need authorization for this action',
      });
    }

    return true;
  }
}

@Injectable()
export class OAuthAuthorizationGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(error: any, user: any) {
    if (error || !user) {
      throw error ??
        ServiceException.create(HttpStatus.UNAUTHORIZED, {
          message: 'You need authorization for this action',
        });
    }

    return user;
  }

  async canActivate(context: ExecutionContext) {
    if (!(await super.canActivate(context))) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const roles =
      this.reflector.get<UserRole[]>('oauth.roles', context.getHandler()) ?? [];

    if (!roles.some((role) => user.role === role)) {
      throw ServiceException.create(HttpStatus.FORBIDDEN, {
        message: 'You do not have permissions for this action',
      });
    }

    return true;
  }
}
