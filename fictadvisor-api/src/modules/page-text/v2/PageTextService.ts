import { Injectable } from '@nestjs/common';
import {
  CreatePageTextDTO,
  UpdatePageTextsDTO,
  QueryAllPageTextsDTO,
} from '@fictadvisor/utils/requests';
import { PageTextRepository } from '../../../database/v2/repositories/PageTextRepository';
import { DbPageText } from '../../../database/v2/entities/DbPageText';

@Injectable()
export class PageTextService {
  constructor (
    private pageTextRepository: PageTextRepository,
  ) {}

  async getAll (body: QueryAllPageTextsDTO) {
    return this.pageTextRepository.findMany({
      key: {
        in: body.keys,
      },
    });
  }

  async create (body: CreatePageTextDTO) {
    return this.pageTextRepository.create(body);
  }

  async updateMany (body: UpdatePageTextsDTO) {
    const updPageTexts: DbPageText[] = [];
    for (const pageText of body.pageTexts) {
      const updResource = await this.pageTextRepository.updateById(pageText.key, pageText);
      updPageTexts.push(updResource);
    }

    return updPageTexts;
  }
}
