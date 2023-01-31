import { Body, Controller, Get, Post } from '@nestjs/common';
import { Authorize } from 'src/v1/security/security.authorization';
import { Context, SecurityContext } from 'src/v1/security/security.context';
import { UserDto } from '../user/dto/user.dto';
import { ExchangeTokenDto } from './dto/exchange-token.dto';
import { OAuthTelegramDto } from './dto/oauth-telegram.dto';
import { type OAuthTokenDto } from './dto/oauth-token.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { OAuthService } from './oauth.service';

@Controller('oauth')
export class OAuthController {
  constructor (private readonly oauthService: OAuthService) {}

  @Authorize()
  @Get()
  getMe (@Context() ctx: SecurityContext): UserDto {
    return UserDto.from(ctx.user);
  }

  @Post('/telegram/exchange')
  async telegramExchange (@Body() body: ExchangeTokenDto): Promise<OAuthTokenDto> {
    return await this.oauthService.exchange(body);
  }

  @Authorize({ telegram: true })
  @Post('/telegram')
  async telegram (@Body() body: OAuthTelegramDto): Promise<OAuthTokenDto> {
    return await this.oauthService.login(body);
  }

  @Post('/refresh')
  async refresh (@Body() body: RefreshTokenDto): Promise<OAuthTokenDto> {
    return await this.oauthService.refresh(body.refreshToken);
  }
}
