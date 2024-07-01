import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from 'src/v2/utils/exceptions/InvalidEntityIdException';
import { FAQRepository } from '../../database/repositories/FAQRepository';

@Injectable()
export class FAQByIDPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private faqRepository: FAQRepository,
  ) {}

  async transform (faqId: string): Promise<string> {
    const faq = await this.faqRepository.findById(faqId);
    if (!faq) {
      throw new InvalidEntityIdException('FAQ');
    }

    return faqId;
  }
}
