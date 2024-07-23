import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreatePageTextDTO,
  UpdatePageTextsDTO,
  QueryAllPageTextsDTO,
} from '@fictadvisor/utils/requests';
import { PageTextResponse, PageTextsResponse } from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { PageTextService } from '../services/PageTextService';

@ApiTags('PageText')
@Controller({
  version: '2',
  path: '/pageTexts',
})
export class PageTextController {
  constructor (
    private pageTextService: PageTextService,
  ) {}

  @ApiOkResponse({
    type: [PageTextsResponse],
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidQueryException:
      Keys can not be empty`,
  })
  @ApiEndpoint({
    summary: 'Get all texts for page',
  })
  @Get()
  async getAll (
    @Query() query: QueryAllPageTextsDTO,
  ) {
    return this.pageTextService.getAll(query);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: PageTextResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Key can not be empty
      Value can not be empty`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiEndpoint({
    summary: 'Create text for page',
    permissions: PERMISSION.PAGE_TEXTS_CREATE,
  })
  @Post()
  create (
    @Body() body: CreatePageTextDTO,
  ) {
    return this.pageTextService.create(body);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: PageTextsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Key can not be empty
      
    InvalidEntityId:
      Resource with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiEndpoint({
    summary: 'Update many page texts by given keys',
    permissions: PERMISSION.PAGE_TEXTS_UPDATE,
  })
  @Patch()
  async updateMany (
    @Body() body: UpdatePageTextsDTO,
  ) {
    return this.pageTextService.updateMany(body);
  }
}