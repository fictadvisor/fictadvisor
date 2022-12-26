import { Body, Controller, Post } from '@nestjs/common';
import { DisciplineService } from './DisciplineService';
import { CreateDisciplineDTO } from './dto/CreateDisciplineDTO';

@Controller({
  version: '2',
  path: '/disciplines'
})
export class DisciplineController {
  constructor(
    private disciplineService: DisciplineService,
  ) {}

  @Post()
  create(@Body() body: CreateDisciplineDTO) {
    return this.disciplineService.create(body);
  }

}