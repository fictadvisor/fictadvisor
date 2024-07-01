import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FAQCategoryPipe } from '../pipes/FAQCategoryPipe';
import {
  FAQCategoriesWithFAQsResponse,
  FAQCategoryDTO,
  FAQCategoryWithFAQsResponse,
  PERMISSION,
} from '@fictadvisor/utils';
import { FAQCategoryByIdPipe } from '../pipes/FAQCategoryByIdPipe';
import { FAQCategoryService } from '../services/FAQCategoryService';
import { FAQCategoryMapper } from '../../mappers/FAQCategoryMapper';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { FAQCategoryDocumentation } from '../../utils/documentation/faqCategory';

@ApiTags('FAQ Category')
@Controller({
  version: '2',
  path: '/faqCategories',
})
export class FAQCategoriesController {
  constructor (
    private readonly faqCategoryService: FAQCategoryService,
    private readonly faqCategoryMapper: FAQCategoryMapper,
  ) {}

  @ApiEndpoint({
    summary: 'Create a FAQ category',
    documentation: FAQCategoryDocumentation.CREATE,
    permissions: PERMISSION.FAQS_CATEGORIES_CREATE,
  })
  @Post()
  async createCategory (
    @Body(FAQCategoryPipe) { name }: FAQCategoryDTO,
  ): Promise<FAQCategoryWithFAQsResponse> {
    const category = await this.faqCategoryService.create(name);
    return this.faqCategoryMapper.getCategory(category);
  }

  @ApiEndpoint({
    summary: 'Get all FAQ categories',
    documentation: FAQCategoryDocumentation.GET_ALL,
  })
  @Get()
  async getAllCategories (): Promise<FAQCategoriesWithFAQsResponse> {
    const categories = await this.faqCategoryService.getAll();
    return this.faqCategoryMapper.getCategories(categories);
  }

  @ApiEndpoint({
    summary: 'Get FAQ category with selected id',
    documentation: FAQCategoryDocumentation.GET,
  })
  @Get('/:categoryId')
  async getCategory (
    @Param('categoryId', FAQCategoryByIdPipe) categoryId: string,
  ): Promise<FAQCategoryWithFAQsResponse> {
    const category = await this.faqCategoryService.get(categoryId);
    return this.faqCategoryMapper.getCategory(category);
  }

  @ApiEndpoint({
    summary: 'Update FAQ category with selected id',
    documentation: FAQCategoryDocumentation.UPDATE,
    permissions: PERMISSION.FAQS_CATEGORIES_UPDATE,
  })
  @Patch('/:categoryId')
  async updateCategory (
    @Param('categoryId', FAQCategoryByIdPipe) categoryId: string,
    @Body(FAQCategoryPipe) { name }: FAQCategoryDTO,
  ): Promise<FAQCategoryWithFAQsResponse> {
    const category = await this.faqCategoryService.update(categoryId, name);
    return this.faqCategoryMapper.getCategory(category);
  }

  @ApiEndpoint({
    summary: 'Delete FAQ category by selected id',
    documentation: FAQCategoryDocumentation.DELETE,
    permissions: PERMISSION.FAQS_CATEGORIES_DELETE,
  })
  @Delete('/:categoryId')
  async deleteCategory (
    @Param('categoryId', FAQCategoryByIdPipe) categoryId: string,
  ): Promise<FAQCategoryWithFAQsResponse> {
    const category = await this.faqCategoryService.delete(categoryId);
    return this.faqCategoryMapper.getCategory(category);
  }
}