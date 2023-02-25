import { Controller, Request, Post, UseGuards, Body, Put, Param, Get, Query } from '@nestjs/common';
import { LocalAuthGuard } from '../../security/LocalGuard';
import { AuthService } from './AuthService';
import { RegistrationDTO, TelegramDTO } from './dto/RegistrationDTO';
import { JwtGuard } from '../../security/JwtGuard';
import { ForgotPasswordDTO } from './dto/ForgotPasswordDTO';
import { ResetPasswordDTO } from './dto/ResetPasswordDTO';
import { UpdatePasswordDTO } from './dto/UpdatePasswordDTO';
import { VerificateEmailDTO } from './dto/VerificateEmailDTO';
import { IdentityQueryDTO } from './dto/IdentityQueryDTO';
import { UserService } from '../user/UserService';
import { TelegramGuard } from '../../security/TelegramGuard';
import { RegisterTelegramDTO } from './dto/RegisterTelegramDTO';

@Controller({
  version: '2',
  path: '/auth',
})
export class AuthController {
  constructor (
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login (@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(TelegramGuard)
  @Post('/registerTelegram')
  async registerTelegram (
    @Body() body: RegisterTelegramDTO,
  ) {
    this.authService.registerTelegram(body);
  }

  @Post('/register')
  async register (@Body() body: RegistrationDTO) {
    return this.authService.register(body);
  }

  @Post('/loginTelegram')
  async loginTelegram (@Body() body: TelegramDTO) {
    return this.authService.loginTelegram(body);
  }

  @UseGuards(JwtGuard)
  @Post('/refresh')
  async refresh (@Request() req) {
    return this.authService.refresh(req.user);
  }

  @UseGuards(JwtGuard)
  @Put('/updatePassword')
  async updatePassword (
    @Body() body: UpdatePasswordDTO,
    @Request() req,
  ) {
    return this.authService.updatePassword(body, req.user);
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  getMe (
    @Request() req,
  ) {
    return this.userService.getUser(req.user.id);
  }

  @Post('/forgotPassword')
  async forgotPassword (
    @Body() body: ForgotPasswordDTO,
  ) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('/resetPassword/:token')
  async resetPassword (
    @Param('token') token: string,
    @Body() body: ResetPasswordDTO,
  ) {
    return this.authService.resetPassword(token, body);
  }

  @Post('/register/verifyEmail')
  requestEmailVerification (
    @Body() body: VerificateEmailDTO,
  ) {
    return this.authService.requestEmailVerification(body.email);
  }

  @Post('/register/verifyEmail/:token')
  verifyEmail (
    @Param('token') token: string,
  ) {
    return this.authService.verifyEmail(token);
  }

  @Get('/verifyIsRegistered')
  verifyExistsByUnique (
    @Query() query: IdentityQueryDTO,
  ) {
    return this.authService.checkIfUserIsRegistered(query);
  }

  @Get('/checkCaptain/:groupId')
  checkCaptain (
    @Param('groupId') groupId: string,
  ) {
    return this.authService.checkCaptain(groupId);
  }

  @Get('/checkResetToken/:token')
  checkResetToken (
    @Param('token') token: string,
  ) {
    const isAvailable = this.authService.checkResetToken(token);
    return { isAvailable };
  }

  @Get('/checkRegisterTelegram/:token')
  checkRegisterTelegram (
    @Param('token') token: string,
  ) {
    const isRegistered = this.authService.checkTelegram(token);
    return { isRegistered };
  }
}