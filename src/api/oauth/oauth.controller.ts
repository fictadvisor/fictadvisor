import { Body, Controller, Get, Post } from '@nestjs/common';
import { Authorize } from 'src/security/security.authorization';
import { Context, SecurityContext } from 'src/security/security.context';
import { UserDto } from '../user/dto/user.dto';
import { ExchangeTokenDto } from './dto/exchange-token.dto';
import { OAuthTelegramDto } from './dto/oauth-telegram.dto';
import { OAuthTokenDto } from './dto/oauth-token.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { OAuthService } from './oauth.service';

@Controller('oauth')
export class OAuthController {
  constructor(private oauthService: OAuthService) {}

  @Authorize()
  @Get()
  getMe(@Context() ctx: SecurityContext): UserDto {
    return UserDto.from(ctx.user);
  }

  @Post('/telegram/exchange')
  telegramExchange(@Body() body: ExchangeTokenDto): Promise<OAuthTokenDto> {
    return this.oauthService.exchange(body);
  }

  @Authorize({ telegram: true })
  @Post('/telegram')
  telegram(@Body() body: OAuthTelegramDto): Promise<OAuthTokenDto> {
    return this.oauthService.login(body);
  }

  @Post('/refresh')
  refresh(@Body() body: RefreshTokenDto): Promise<OAuthTokenDto> {
    return this.oauthService.refresh(body.refreshToken);
  }
}
