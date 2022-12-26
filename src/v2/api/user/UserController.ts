import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './UserService';
import { TelegramGuard } from '../../security/TelegramGuard';

@Controller({
  version: '2',
  path: '/users'
})
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @UseGuards(TelegramGuard)
  @Put('/verify/:id')
  verify(@Param('id') id: string) {
    return this.userService.verify(id);
  }

}