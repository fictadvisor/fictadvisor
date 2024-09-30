import { Body, Controller, Delete, Param, Patch, Post, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateCathedraDTO,
  UpdateCathedraDTO,
  QueryAllCathedrasDTO,
} from '@fictadvisor/utils/requests';
import {
  CathedraResponse,
  CathedraWithTeachersResponse,
  PaginatedCathedrasWithTeachersResponse,
  CathedrasDivisionsResponse,
} from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { CathedraByIdPipe } from '../pipes/CathedraByIdPipe';
import { CathedraTeachersPipe } from '../pipes/CathedraTeachersPipe';
import { CathedraMapper } from '../../mappers/CathedraMapper';
import { CathedraService } from '../services/CathedraService';

@ApiTags('Cathedra')
@Controller({
  version: '2',
  path: '/cathedras',
})
export class CathedraController {
  constructor (
    private cathedraService: CathedraService,
    private cathedraMapper: CathedraMapper,
  ) {}

  @ApiOkResponse({
    type: PaginatedCathedrasWithTeachersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidQueryException:
      Page must be a number
      PageSize must be a number
      Wrong value for order
      Faculties must be an array
      Sort must be an enum`,
  })
  @ApiEndpoint({
    summary: 'Get all cathedras',
  })
  @Get()
  async getAll (
    @Query() query: QueryAllCathedrasDTO,
  ) {
    const cathedras = await this.cathedraService.getAll(query);
    const cathedrasWithTeachers = this.cathedraMapper.getCathedraWithNumberOfTeachers(cathedras.data);
    return {
      cathedras: cathedrasWithTeachers,
      pagination: cathedras.pagination,
    };
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    type: CathedraResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException: 
      Cathedra name is too short (min: 3)
      Cathedra name is too long (max: 150)
      Cathedra name is incorrect (A-Я(укр.)\\-' )
      Abbreviation is too short (min: 1)
      Abbreviation is too long (max: 10)
      Abbreviation can not be empty
      Abbreviation is incorrect (A-Я(укр.)\\-' )
      Division name is too short (min: 1)
      Division name is too long (max: 10)
      Cathedra name is incorrect (A-Я(укр.)\\\\-\\' )
      Teachers must be an array
      
    InvalidEntityIdException:
      Teacher with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiEndpoint({
    summary: 'Create a new cathedra',
    permissions: PERMISSION.CATHEDRAS_CREATE,
  })
  @Post()
  async create (@Body(CathedraTeachersPipe) body: CreateCathedraDTO): Promise<CathedraResponse> {
    const cathedra = await this.cathedraService.create(body);
    return this.cathedraMapper.getCathedraWithTeachers(cathedra);
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    type: CathedraWithTeachersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Cathedra name is too short (min: 3)
      Cathedra name is too long (max: 150)
      Cathedra name is incorrect (A-Я(укр.)\\-' )
      Abbreviation is too short (min: 1)
      Abbreviation is too long (max: 10)
      Abbreviation can not be empty
      Abbreviation is incorrect (A-Я(укр.)\\-' )
      Division name is too short (min: 1)
      Division name is too long (max: 10)
      Cathedra name is incorrect (A-Я(укр.)\\\\-\\' )
      Teachers to delete must be an array
      Teachers to add must be an array
      
    InvalidEntityIdException:
      Cathedra with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'cathedraId',
    required: true,
    description: 'Id of a cathedra to update',
  })
  @ApiEndpoint({
    summary: 'Update cathedra with selected id',
    permissions: PERMISSION.CATHEDRAS_UPDATE,
  })
  @Patch('/:cathedraId')
  async update (
    @Param('cathedraId', CathedraByIdPipe) cathedraId: string,
    @Body() body: UpdateCathedraDTO,
  ): Promise<CathedraWithTeachersResponse> {
    const cathedra = await this.cathedraService.update(cathedraId, body);
    return this.cathedraMapper.getCathedraWithTeachers(cathedra);
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    type: CathedraWithTeachersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Cathedra with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'cathedraId',
    required: true,
    description: 'Id of a cathedra to delete',
  })
  @ApiEndpoint({
    summary: 'Delete cathedra with selected id',
    permissions: PERMISSION.CATHEDRAS_DELETE,
  })
  @Delete('/:cathedraId')
  async delete (
    @Param('cathedraId', CathedraByIdPipe) cathedraId: string,
  ): Promise<CathedraWithTeachersResponse> {
    const cathedra = await this.cathedraService.delete(cathedraId);
    return this.cathedraMapper.getCathedraWithTeachers(cathedra);
  }

  @ApiOkResponse({
    type: CathedrasDivisionsResponse,
  })
  @ApiEndpoint({
    summary: 'Get all divisions',
  })
  @Get('/divisions')
  getAllDivisions (): Promise<CathedrasDivisionsResponse> {
    return this.cathedraService.getAllDivisions();
  }

  @ApiOkResponse({
    type: CathedraWithTeachersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Cathedra with such id is not found`,
  })
  @ApiParam({
    name: 'cathedraId',
    required: true,
    description: 'Id of a cathedra to get',
  })
  @ApiEndpoint({
    summary: 'Get cathedra by id',
  })
  @Get(':cathedraId')
  async getById (@Param('cathedraId', CathedraByIdPipe) cathedraId: string) {
    const cathedra = await this.cathedraService.getById(cathedraId);
    return this.cathedraMapper.getCathedraWithTeachers(cathedra);
  }
}
