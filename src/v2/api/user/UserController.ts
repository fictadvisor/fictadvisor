import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './UserService';
import { TelegramGuard } from '../../security/TelegramGuard';
import { JwtGuard } from '../../security/JwtGuard';
import { ApproveDTO } from './dto/ApproveDTO';
import { GiveRoleDTO } from './dto/GiveRoleDTO';
import { CreateSuperheroDTO } from './dto/CreateSuperheroDTO';

@Controller({
  version: '2',
  path: '/users',
})
export class UserController {
  constructor (
    private readonly userService: UserService
  ) {
  }

  @UseGuards(TelegramGuard)
  @Patch('/:userId/verifyStudent')
  async verify (
  @Param('userId') userId: string,
    @Body() body: ApproveDTO
  ) {
    await this.userService.updateStudent(userId, body);
  }

  @UseGuards(TelegramGuard)
  @Patch('/:userId/verifySuperhero')
  async verifySuperhero (
  @Param('userId') userId: string,
    @Body() body: ApproveDTO
  ) {
    await this.userService.updateSuperhero(userId, body);
  }

  @UseGuards(JwtGuard)
  @Post('/superhero')
  async createSuperhero (
  @Request() req,
    @Body() body: CreateSuperheroDTO
  ) {
    await this.userService.createSuperhero(req.user.id, body);
  }

  @UseGuards()
  @Get('/selective')
  async getSelective (
  @Request() req
  ) {
    const dbDisciplines = await this.userService.getSelective(req.user.id);
    return { disciplines: dbDisciplines.map((d) => d.id) };
  }

  @UseGuards()
  @Post('/:userId/roles')
  async giveRole (
  @Param('userId') userId: string,
    @Body() body: GiveRoleDTO
  ) {
    await this.userService.giveRole(userId, body);
  }

  @Delete('/:userId/roles/:roleId')
  async removeRole (
  @Param('userId') userId: string,
    @Param('roleId') roleId: string
  ) {
    await this.userService.removeRole(userId, roleId);
  }
}
