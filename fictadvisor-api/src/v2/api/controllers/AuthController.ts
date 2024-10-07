import { Controller, Request, Post, Body, Put, Param, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  RegistrationDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  UpdatePasswordDTO,
  VerificationEmailDTO,
  IdentityQueryDTO,
  TelegramDTO,
  RegisterTelegramDTO,
} from '@fictadvisor/utils/requests';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { LocalAuthGuard } from '../../security/LocalGuard';
import { JwtGuard } from '../../security/JwtGuard';
import { TelegramGuard } from '../../security/TelegramGuard';
import { GroupByIdPipe } from '../pipes/GroupByIdPipe';
import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';
import { RefreshGuard } from '../../security/RefreshGuard';
import { AuthDocumentation } from '../../utils/documentation/auth';

@ApiTags('Auth')
@Controller({
  version: '2',
  path: '/auth',
})
export class AuthController {
  constructor (
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiEndpoint({
    summary: 'Login to the user account',
    guards: LocalAuthGuard,
    documentation: AuthDocumentation.LOGIN,
  })
  @Post('/login')
  async login (
    @Request() req,
  ) {
    return this.authService.login(req.user);
  }

  @ApiEndpoint({
    summary: 'Register user\'s telegram account',
    guards: TelegramGuard,
    documentation: AuthDocumentation.REGISTER_TELEGRAM,
  })
  @Post('/registerTelegram')
  async registerTelegram (
    @Body() body: RegisterTelegramDTO,
  ) {
    return this.authService.registerTelegram(body);
  }


  @ApiEndpoint({
    summary: 'Register new user',
    documentation: AuthDocumentation.REGISTER,
  })
  @Post('/register')
  async register (
    @Body() body: RegistrationDTO,
  ) {
    return this.authService.register(body);
  }


  @ApiEndpoint({
    summary: 'Login with Telegram',
    documentation: AuthDocumentation.LOGIN_TELEGRAM,
  })
  @Post('/loginTelegram')
  async loginTelegram (
    @Body() body: TelegramDTO,
  ) {
    return this.authService.loginTelegram(body);
  }

  @ApiEndpoint({
    summary: 'Refresh access token',
    guards: RefreshGuard,
    documentation: AuthDocumentation.REFRESH,
  })
  @Post('/refresh')
  async refresh (
    @Request() req,
  ) {
    return this.authService.refresh(req.user);
  }

  @ApiEndpoint({
    summary: 'Change old password',
    guards: JwtGuard,
    documentation: AuthDocumentation.UPDATE_PASSWORD,
  })
  @Put('/updatePassword')
  async updatePassword (
    @Body() body: UpdatePasswordDTO,
    @Request() req,
  ) {
    return this.authService.updatePassword(body, req.user);
  }

  @ApiEndpoint({
    summary: 'Get information about the current user based on JWT authorization',
    guards: JwtGuard,
    documentation: AuthDocumentation.GET_ME,
  })
  @Get('/me')
  getMe (
    @Request() req,
  ) {
    return this.userService.getUser(req.user.id);
  }

  @ApiEndpoint({
    summary: 'Request a password reset procedure based on the email address provided',
    documentation: AuthDocumentation.FORGOT_PASSWORD,
  })
  @Post('/forgotPassword')
  async forgotPassword (
    @Body() body: ForgotPasswordDTO,
  ) {
    return this.authService.forgotPassword(body.email);
  }

  @ApiEndpoint({
    summary: 'Set a new password using a valid password reset token',
    documentation: AuthDocumentation.RESET_PASSWORD,
  })
  @Post('/resetPassword/:token')
  async resetPassword (
    @Param('token') token: string,
    @Body() body: ResetPasswordDTO,
  ) {
    return this.authService.resetPassword(token, body);
  }

  @ApiEndpoint({
    summary: 'Resend the email confirmation request for a user who has not completed the registration process yet',
    documentation: AuthDocumentation.REQUEST_EMAIL_VERIFICATION,
  })
  @Post('/register/verifyEmail')
  requestEmailVerification (
    @Body() body: VerificationEmailDTO,
  ) {
    return this.authService.repeatEmailVerification(body.email);
  }

  @ApiEndpoint({
    summary: 'Verify the user\'s email address during the completion of registration in the system using token',
    documentation: AuthDocumentation.VERIFY_EMAIL,
  })
  @Post('/register/verifyEmail/:token')
  verifyEmail (
    @Param('token') token: string,
  ) {
    return this.authService.verifyEmail(token);
  }

  @ApiEndpoint({
    summary: 'Check whether the user is registered in the system by email and/or username',
    documentation: AuthDocumentation.VERIFY_EXIST_BY_UNIQUE,
  })
  @Get('/verifyIsRegistered')
  verifyExistsByUnique (
    @Query() query: IdentityQueryDTO,
  ) {
    return this.authService.checkIfUserIsRegistered(query);
  }

  @ApiEndpoint({
    summary: 'Check if the group has a captain',
    documentation: AuthDocumentation.CHECK_CAPTAIN,
  })
  @Get('/checkCaptain/:groupId')
  checkCaptain (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    return this.authService.checkCaptain(groupId);
  }

  @ApiEndpoint({
    summary: 'Check if reset token is available',
    documentation: AuthDocumentation.CHECK_RESET_TOKEN,
  })
  @Get('/checkResetToken/:token')
  async checkResetToken (
    @Param('token') token: string,
  ) {
    const isAvailable = !!(await this.authService.checkResetToken(token));
    return { isAvailable };
  }

  @ApiEndpoint({
    summary: 'Check telegram registration status by a token',
    documentation: AuthDocumentation.CHECK_REGISTER_TELEGRAM,
  })
  @Get('/checkRegisterTelegram/:token')
  async checkRegisterTelegram (
    @Param('token') token: string,
  ) {
    const isRegistered = !!(await this.authService.checkTelegram(token));
    return { isRegistered };
  }
}
