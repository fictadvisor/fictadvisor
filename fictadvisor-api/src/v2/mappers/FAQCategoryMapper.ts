import { Injectable } from '@nestjs/common';
import { DbFAQCategory } from '../database/entities/DbFAQCategory';
import { FAQCategoriesWithFAQsResponse, FAQCategoryWithFAQsResponse } from '@fictadvisor/utils';

@Injectable()
export class FAQCategoryMapper {
  getCategory (category: DbFAQCategory): FAQCategoryWithFAQsResponse {
    return {
      id: category.id,
      name: category.name,
      faqs: category.faqs.map((faqToCategory) => faqToCategory.faq),
    };
  }

  getCategories (categories: DbFAQCategory[]): FAQCategoriesWithFAQsResponse {
    return {
      categories: categories.map(this.getCategory),
    };
  }
}