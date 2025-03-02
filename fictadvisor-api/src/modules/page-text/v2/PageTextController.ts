import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreatePageTextDTO,
  UpdatePageTextsDTO,
  QueryAllPageTextsDTO,
} from '@fictadvisor/utils/requests';
import { PERMISSION } from '@fictadvisor/utils/security';
import { ApiEndpoint } from '../../../common/decorators/ApiEndpoint';
import { PageTextService } from './PageTextService';
import { PageTextDocumentation } from '../../../common/documentation/modules/v2/pageText';
import { PageTextByKeyPipe } from '../../../common/pipes/PageTextByKeyPipe';
import { ValidatePageTextsPipe } from '../../../common/pipes/ValidatePageTextsPipe';

@ApiTags('PageText')
@Controller({
  version: '2',
  path: '/pageTexts',
})
export class PageTextController {
  constructor (
    private pageTextService: PageTextService,
  ) {}

  @ApiEndpoint({
    summary: 'Get all texts for page',
    documentation: PageTextDocumentation.GET_ALL,
  })
  @Get()
  async getAll (
    @Query() query: QueryAllPageTextsDTO,
  ) {
    return this.pageTextService.getAll(query);
  }

  @ApiEndpoint({
    summary: 'Create text for page',
    documentation: PageTextDocumentation.CREATE,
    permissions: PERMISSION.PAGE_TEXTS_CREATE,
  })
  @Post()
  create (
    @Body(PageTextByKeyPipe) body: CreatePageTextDTO,
  ) {
    return this.pageTextService.create(body);
  }

  @ApiEndpoint({
    summary: 'Update many page texts by given keys',
    documentation: PageTextDocumentation.UPDATE_MANY,
    permissions: PERMISSION.PAGE_TEXTS_UPDATE,
  })
  @Patch()
  async updateMany (
    @Body(ValidatePageTextsPipe) body: UpdatePageTextsDTO,
  ) {
    return this.pageTextService.updateMany(body);
  }
}
