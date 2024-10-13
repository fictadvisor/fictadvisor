import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Delete, Param, Get, Patch, Query } from '@nestjs/common';
import { FAQService } from '../services/FAQService';
import {
  CreateFAQDTO,
  PaginatedFAQsWithCategoriesResponse,
  FAQWithCategoriesResponse,
  PERMISSION,
  UpdateFAQDTO,
  QueryAllFAQsDTO,
} from '@fictadvisor/utils';
import { FAQByCategoriesIdsPipe } from '../pipes/FAQByCategoriesIdsPipe';
import { FAQByIDPipe } from '../pipes/FAQByIDPipe';
import { FAQMapper } from '../../mappers/FAQMapper';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { FAQDocumentation } from '../../utils/documentation/faq';
import { TelegramGuard } from '../../security/TelegramGuard';

@ApiTags('FAQ')
@Controller({
  version: '2',
  path: '/faqs',
})
export class FAQController {
  constructor (
    private readonly faqService: FAQService,
    private readonly faqMapper: FAQMapper,
  ) {}

  @ApiEndpoint({
    summary: 'Create a new FAQ',
    permissions: PERMISSION.FAQS_CREATE,
    guards: TelegramGuard,
    documentation: FAQDocumentation.CREATE,
  })
  @Post()
  async create (
    @Body(FAQByCategoriesIdsPipe) body: CreateFAQDTO,
  ): Promise<FAQWithCategoriesResponse> {
    const faq = await this.faqService.create(body);
    return this.faqMapper.getFAQWithCategories(faq);
  }

  @ApiEndpoint({
    summary: 'Get all FAQs with selected filters',
    documentation: FAQDocumentation.GET_ALL,
  })
  @Get()
  async getAll (
    @Query(FAQByCategoriesIdsPipe) query: QueryAllFAQsDTO,
  ): Promise<PaginatedFAQsWithCategoriesResponse> {
    const faqs = await this.faqService.getAll(query);
    return {
      ...this.faqMapper.getFAQsWithCategories(faqs.data),
      pagination: faqs.pagination,
    };
  }

  @ApiEndpoint({
    summary: 'Get a single FAQ by id',
    documentation: FAQDocumentation.GET,
  })
  @Get('/:faqId')
  async get (
    @Param('faqId', FAQByIDPipe) faqId: string,
  ): Promise<FAQWithCategoriesResponse> {
    const faq = await this.faqService.get(faqId);
    return this.faqMapper.getFAQWithCategories(faq);
  }

  @ApiEndpoint({
    summary: 'Update an existing FAQ by id',
    permissions: PERMISSION.FAQS_UPDATE,
    documentation: FAQDocumentation.UPDATE,
  })
  @Patch('/:faqId')
  async update (
    @Param('faqId', FAQByIDPipe) faqId: string,
    @Body(FAQByCategoriesIdsPipe) body: UpdateFAQDTO,
  ): Promise<FAQWithCategoriesResponse> {
    const faq = await this.faqService.update(faqId, body);
    return this.faqMapper.getFAQWithCategories(faq);
  }

  @ApiEndpoint({
    summary: 'Delete an FAQ by id',
    permissions: PERMISSION.FAQS_DELETE,
    documentation: FAQDocumentation.DELETE,
  })
  @Delete('/:faqId')
  async delete (
    @Param('faqId', FAQByIDPipe) faqId: string,
  ): Promise<FAQWithCategoriesResponse> {
    const faq = await this.faqService.delete(faqId);
    return this.faqMapper.getFAQWithCategories(faq);
  }
}
