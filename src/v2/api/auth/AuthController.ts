import { Controller, Request, Post, UseGuards, Body, Put, UnauthorizedException, Param } from '@nestjs/common';
import { LocalAuthGuard } from '../../security/LocalGuard';
import { AuthService } from './AuthService';
import { RegistrationDTO, TelegramDTO } from './dto/RegistrationDTO';
import { JwtGuard } from '../../security/JwtGuard';
import { ForgotPasswordDTO } from './dto/ForgotPasswordDTO';
import { ResetPasswordDTO } from './dto/ResetPasswordDTO';
import { UpdatePasswordDTO } from "./dto/UpdatePasswordDTO";
import { VerificateEmailDTO } from './dto/VerificateEmailDTO';

@Controller({
  version: '2',
  path: '/auth',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  async register(@Body() body: RegistrationDTO) {
    return this.authService.register(body);
  }

  @Post('/loginTelegram')
  async loginTelegram(@Body() body: TelegramDTO) {
    return this.authService.loginTelegram(body);
  }

  @UseGuards(JwtGuard)
  @Post('/refresh')
  async refresh(@Request() req) {
    return this.authService.refresh(req.user);
  }

  @UseGuards(JwtGuard)
  @Put('/updatePassword')
  async updatePassword(
      @Body() body: UpdatePasswordDTO,
      @Request() req,
    ) {
    const tokens = await this.authService.updatePassword(body, req.user);

    if (!tokens) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    return tokens;
  }

  @Post('/forgotPassword')
  async forgotPassword(
    @Body() body: ForgotPasswordDTO,
  ) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('/resetPassword/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() body: ResetPasswordDTO,
  ) {
    return this.authService.resetPassword(token, body);
  }

  @Post('/register/verifyEmail')
  async requestEmailVerification(
    @Body() body: VerificateEmailDTO,
  ) {
    return this.authService.requestEmailVerification(body.email);
  }

  @Post('/register/verifyEmail/:token')
  async verificateEmail(
    @Param('token') token: string,
  ) {
    return this.authService.verificateEmail(token);
  }
}