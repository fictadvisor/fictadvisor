import { Injectable } from '@nestjs/common';
import { DbFAQ } from '../database/entities/DbFAQ';
import { FAQsWithCategoriesResponse, FAQWithCategoriesResponse } from '@fictadvisor/utils';

@Injectable()
export class FAQMapper {
  getFAQWithCategories (faq: DbFAQ): FAQWithCategoriesResponse {
    return {
      id: faq.id,
      text: faq.text,
      answer: faq.answer,
      categories: faq.categories.map((faqsToCategory) => faqsToCategory.category),
    };
  }

  getFAQsWithCategories (faqs: DbFAQ[]): FAQsWithCategoriesResponse {
    return {
      faqs: faqs.map(this.getFAQWithCategories),
    };
  }
}