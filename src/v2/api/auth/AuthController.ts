import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../../security/LocalGuard';
import { AuthService } from './AuthService';
import { RegistrationDTO, TelegramDTO } from './dto/RegistrationDTO';


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

}