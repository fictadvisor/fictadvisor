import { Injectable, PipeTransform } from '@nestjs/common';
import { FAQCategoryRepository } from '../../database/repositories/FAQCategoryRepository';
import { AlreadyExistException } from '../../utils/exceptions/AlreadyExistException';
import { FAQCategoryDTO } from '@fictadvisor/utils';

@Injectable()
export class FAQCategoryPipe
implements PipeTransform<FAQCategoryDTO, Promise<FAQCategoryDTO>> {
  constructor (private readonly faqCategoryRepository: FAQCategoryRepository) {}

  async transform (dto: FAQCategoryDTO): Promise<FAQCategoryDTO> {
    const category = await this.faqCategoryRepository.findByName(dto.name);
    if (category) {
      throw new AlreadyExistException('FAQ category');
    }

    return dto;
  }
}