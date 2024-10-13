import { Module } from '@nestjs/common';
import { FAQController } from '../api/controllers/FAQController';
import { FAQService } from '../api/services/FAQService';
import { FAQRepository } from '../database/repositories/FAQRepository';
import { FAQCategoryRepository } from '../database/repositories/FAQCategoryRepository';
import { FAQByIDPipe } from '../api/pipes/FAQByIDPipe';
import { FAQCategoryByIdPipe } from '../api/pipes/FAQCategoryByIdPipe';
import { FAQCategoryPipe } from '../api/pipes/FAQCategoryPipe';
import { FAQByCategoriesIdsPipe } from '../api/pipes/FAQByCategoriesIdsPipe';
import { FAQCategoriesController } from '../api/controllers/FAQCategoryController';
import { FAQCategoryService } from '../api/services/FAQCategoryService';
import { FAQMapper } from '../mappers/FAQMapper';
import { FAQCategoryMapper } from '../mappers/FAQCategoryMapper';
import { PermissionService } from '../api/services/PermissionService';

@Module({
  controllers: [FAQController, FAQCategoriesController],
  providers: [
    FAQService,
    FAQCategoryService,
    FAQRepository,
    FAQCategoryRepository,
    FAQByIDPipe,
    FAQCategoryByIdPipe,
    FAQCategoryPipe,
    FAQByCategoriesIdsPipe,
    FAQMapper,
    FAQCategoryMapper,
    PermissionService,
  ],
})
export class FAQModule {}