import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Controller, Get, Query, Redirect, Request } from '@nestjs/common';
import { GoogleAuthService } from '../../google/services/GoogleAuthService';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { GoogleAuthLinkResponse, GoogleCheckGrantsResponse } from '@fictadvisor/utils/responses';
import { GoogleConfigService } from '../../config/GoogleConfigService';
import { JwtGuard } from '../../security/JwtGuard';
import { GoogleStateGuard } from '../../security/GoogleStateGuard';

@ApiTags('Google')
@Controller({
  version: '2',
  path: '/google',
})
export class GoogleController {
  constructor (
    private config: GoogleConfigService,
    private googleAuthService: GoogleAuthService,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: GoogleAuthLinkResponse,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized
      There is no google account linked to the user`,
  })
  @ApiEndpoint({
    summary: 'Get an auth link for getting google calendar permissions from the user',
    guards: JwtGuard,
  })
  @Get('/links/calendar')
  async getCalendarLink(@Request() req): Promise<GoogleAuthLinkResponse> {
    const url = await this.googleAuthService.getCalendarUrl(req.user);
    return { url };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: GoogleCheckGrantsResponse,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized
      `,
  })
  @ApiEndpoint({
    summary: 'Check whether the user has granted us access to their Google Calendar',
    guards: JwtGuard,
  })
  @Get('/checkPermissions/calendar')
  async checkCalendarPermissions(@Request() req): Promise<GoogleCheckGrantsResponse> {
    const hasGrantedAccess = await this.googleAuthService.checkUserCalendarPermissions(req.user);

    return { hasGrantedAccess };
  }

  @ApiFoundResponse()
  @ApiForbiddenResponse({
    description: `\n
    Forbidden:
      Forbidden resource`,
  })
  @ApiEndpoint({
    summary: 'Google sends an auth code for user granted Calendar API scopes here',
    guards: GoogleStateGuard,
  })
  @Get('/callback/calendar')
  @Redirect()
  async getGoogleAuthTokens(
    @Request() req,
    @Query('code') authCode?: string,
    @Query('error') error?: string,
  ) {
    const googleError = await this.googleAuthService.saveCalendarTokens(req.user, authCode, error);

    const baseUrl = this.config.calendarRedirectUrl;
    const query = googleError ? `?googleError=${googleError}` : '';
    return { url: `${baseUrl}${query}` };
  }
}
