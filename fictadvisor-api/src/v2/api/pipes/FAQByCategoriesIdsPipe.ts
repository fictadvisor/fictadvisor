import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateFAQDTO } from '@fictadvisor/utils';
import { mapAsync } from '../../utils/ArrayUtil';
import { FAQCategoryByIdPipe } from './FAQCategoryByIdPipe';

@Injectable()
export class FAQByCategoriesIdsPipe implements PipeTransform<CreateFAQDTO, Promise<CreateFAQDTO>> {
  constructor (
    private faqCategoryByIdPipe: FAQCategoryByIdPipe,
  ) {}

  async transform (faq: CreateFAQDTO): Promise<CreateFAQDTO> {
    if (faq.categories) {
      await mapAsync(faq.categories, async (categoryId) => {
        await this.faqCategoryByIdPipe.transform(categoryId);
      });
    }

    return faq;
  }
}
