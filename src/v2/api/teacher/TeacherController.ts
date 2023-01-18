import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { TeacherService } from './TeacherService';
import { GetDTO } from './dto/GetDTO';
import { CreateTeacherDTO } from './dto/CreateTeacherDTO';
import { Teacher } from '@prisma/client';
import { JwtGuard } from '../../security/JwtGuard';

@Controller({
  version: '2',
  path: '/teachers',
})
export class TeacherController {
  constructor(
    private teacherService: TeacherService,
  ) {}

  @Get()
  async getAll(@Query() body: GetDTO<Teacher>) {
    return this.teacherService.getAll(body);
  }

  @Post()
  async create(@Body() body: CreateTeacherDTO) {
    return this.teacherService.create(body);
  }

  @Get('/:teacherId')
  async get(
    @Param('teacherId') teacherId: string,
  ) {
    return this.teacherService.get(teacherId);
  }

  @UseGuards(JwtGuard)
  @Delete('/:teacherId')
  async delete(
    @Param('teacherId') teacherId: string,
  ) {
    return this.teacherService.delete(teacherId);
  }

}