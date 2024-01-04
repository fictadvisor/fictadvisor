import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { Body, Controller, Delete, Param, Patch, Post, Get, Query } from '@nestjs/common';
import { PERMISSION } from '../../security/PERMISSION';
import { CathedraService } from '../services/CathedraService';
import { CathedraMapper } from '../../mappers/CathedraMapper';
import { CathedraByIdPipe } from '../pipes/CathedraByIdPipe';
import { CreateCathedraDTO } from '../dtos/CreateCathedraDTO';
import { UpdateCathedraDTO } from '../dtos/UpdateCathedraDTO';
import { CathedraResponse } from '../responses/CathedraResponse';
import { CathedraWithTeachersResponse } from '../responses/CathedraWithTeachersResponse';
import { QueryAllCathedrasDTO } from '../dtos/QueryAllCathedrasDTO';
import { PaginatedCathedrasWithTeachersResponse } from '../responses/PaginatedCathedrasWithTeachersResponse';


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
      Wrong value for order`,
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

  @ApiBearerAuth()
  @ApiOkResponse({
    type: CathedraResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException: 
      Cathedra name is too short (min: 5)
      Cathedra name is too long (max: 40)
      Cathedra name is incorrect (A-Я(укр.)\\-' )
      Abbreviation is too short (min: 2)
      Abbreviation is too long (max: 6)
      Abbreviation can not be empty
      Abbreviation is incorrect (A-Я(укр.)\\-' )`,
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
  async create (@Body() body: CreateCathedraDTO): Promise<CathedraResponse> {
    const cathedra = await this.cathedraService.create(body);
    return this.cathedraMapper.getCathedra(cathedra);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: CathedraWithTeachersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Cathedra name is too short (min: 5)
      Cathedra name is too long (max: 40)
      Cathedra name can not be empty
      Cathedra name is incorrect (A-Я(укр.)\\-' )
      Abbreviation is too short (min: 2)
      Abbreviation is too long (max: 6)
      Abbreviation can not be empty
      Abbreviation is incorrect (A-Я(укр.)\\-' )
      
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

  @ApiBearerAuth()
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
}
