import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './UserService';
import { TelegramGuard } from '../../security/TelegramGuard';
import { JwtGuard } from '../../security/JwtGuard';
import { ApproveDTO } from './dto/ApproveDTO';

@Controller({
  version: '2',
  path: '/users',
})
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @UseGuards(TelegramGuard)
  @Patch('/verify/:id')
  verify(
    @Param('id') id: string,
    @Body() body: ApproveDTO,
  ) {
    return this.userService.verify(id, body);
  }

  @UseGuards(TelegramGuard)
  @Patch('/verify/:userId/superhero')
  verifySuperhero(
    @Param('userId') userId: string,
    @Body() body: ApproveDTO,
  ) {
    return this.userService.verifySuperhero(userId, body);
  }

  @UseGuards(JwtGuard)
  @Post('/superhero')
  async createSuperhero(
    @Request() req,
    @Body() body,
  ) {
    return this.userService.createSuperhero(req.user.id, body);
  }

  @UseGuards()
  @Get('/selective')
  async getSelective(
    @Request() req,
  ) {
    const dbDisciplines = await this.userService.getSelective(req.user.id);
    return { disciplines: dbDisciplines.map(d => d.id) };
  }

  @UseGuards(TelegramGuard)
  @Post('/roles')
  createRole(
    @Body() body,
  ) {
    return this.userService.createRole(body);
  }
}