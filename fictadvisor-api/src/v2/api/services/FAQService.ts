import { Injectable } from '@nestjs/common';
import { DBFAQ } from '../../database/entities/DBFAQ';
import { FAQRepository } from '../../database/repositories/FAQRepository';
import { CreateFAQDTO } from '@fictadvisor/utils';

@Injectable()
export class FAQService {
  constructor (
    private readonly faqRepository: FAQRepository,
  ) {}
  create (body: CreateFAQDTO): Promise<DBFAQ> {
    const { categories, ...faq } = body;
    return this.faqRepository.create(faq);
  }

  delete (id: string): Promise<DBFAQ> {
    return this.faqRepository.deleteById(id);
  }
}
