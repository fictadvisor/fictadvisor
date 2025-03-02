import { Injectable } from '@nestjs/common';
import {
  CreatePageTextDTO,
  UpdatePageTextsDTO,
  QueryAllPageTextsDTO,
} from '@fictadvisor/utils/requests';
import { PageTextRepository } from '../../../database/v2/repositories/PageTextRepository';
import { PageText } from '@prisma/client';

@Injectable()
export class PageTextService {
  constructor (
    private pageTextRepository: PageTextRepository,
  ) {}

  async getAll (body: QueryAllPageTextsDTO) {
    return this.pageTextRepository.findMany({
      where: {
        key: {
          in: body.keys,
        },
      },
    });
  }

  async create (body: CreatePageTextDTO) {
    return this.pageTextRepository.create(body);
  }

  async updateMany (body: UpdatePageTextsDTO) {
    const updPageTexts: PageText[] = [];
    for (const pageText of body.pageTexts) {
      const updResource = await this.pageTextRepository.update(pageText.key, pageText);
      updPageTexts.push(updResource);
    }

    return updPageTexts;
  }
}
