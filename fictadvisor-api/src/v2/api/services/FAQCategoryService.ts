import { Injectable } from '@nestjs/common';
import { DbFAQCategory } from '../../database/entities/DbFAQCategory';
import { FAQCategoryRepository } from '../../database/repositories/FAQCategoryRepository';

@Injectable()
export class FAQCategoryService {
  constructor (
    private readonly faqCategoryRepository: FAQCategoryRepository,
  ) {}

  create (name: string): Promise<DbFAQCategory> {
    return this.faqCategoryRepository.create({ name });
  }

  getAll (): Promise<DbFAQCategory[]> {
    return this.faqCategoryRepository.findMany({});
  }

  get (categoryId: string): Promise<DbFAQCategory> {
    return this.faqCategoryRepository.findById(categoryId);
  }

  update (categoryId: string, name: string): Promise<DbFAQCategory> {
    return this.faqCategoryRepository.updateById(categoryId, { name });
  }

  delete (categoryId: string): Promise<DbFAQCategory> {
    return this.faqCategoryRepository.deleteById(categoryId);
  }
}