import { Body, Controller, Post } from '@nestjs/common';
import { Authorize } from 'src/security/security.authorization';
import { OAuthTelegramDto } from './dto/oauth-telegram.dto';
import { OAuthTokenDto } from './dto/oauth-token.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { OAuthService } from './oauth.service';

@Controller('oauth')
export class OAuthController {
    constructor(
        private oauthService: OAuthService
    ) {}

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
