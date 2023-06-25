import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateCathedraDTO } from '../dtos/CreateCathedraDTO';
import { CathedraService } from '../services/CathedraService';
import { Access } from '../../security/Access';
import { CathedraWithTeachersResponse } from '../responses/CathedraWithTeachersResponse';

@ApiTags('Cathedra')
@Controller({
  version: '2',
  path: '/cathedras',
})
export class CathedraController {
  constructor (
    private cathedraService: CathedraService,
  ) {}

  @Access('cathedras.create')
  @ApiBearerAuth()
  @Post()
  @ApiOkResponse({
    type: CathedraWithTeachersResponse,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  async create (
    @Body() body: CreateCathedraDTO,
  ) {
    return this.cathedraService.create(body);
  }
}
