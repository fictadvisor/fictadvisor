import { Controller, Request, Post, UseGuards, Body, Put, UnauthorizedException } from '@nestjs/common';
import { LocalAuthGuard } from '../../security/LocalGuard';
import { AuthService } from './AuthService';
import { RegistrationDTO, TelegramDTO } from './dto/RegistrationDTO';
import { JwtGuard } from '../../security/JwtGuard';

@Controller({
  version: '2',
  path: '/auth'
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
  async updatePassword(@Body() body, @Request() req) {
    const tokens = await this.authService.updatePassword(body, req.user);

    if (!tokens) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    return tokens;
  }

}