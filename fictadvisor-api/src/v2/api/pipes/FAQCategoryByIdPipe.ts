import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from 'src/v2/utils/exceptions/InvalidEntityIdException';
import { FAQCategoryRepository } from '../../database/repositories/FAQCategoryRepository';

@Injectable()
export class FAQCategoryByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private faqCategoryRepository: FAQCategoryRepository,
  ) {}

  async transform (categoryId: string): Promise<string> {
    const category = await this.faqCategoryRepository.findById(categoryId);
    if (!category) {
      throw new InvalidEntityIdException('FAQ Category');
    }

    return categoryId;
  }
}
