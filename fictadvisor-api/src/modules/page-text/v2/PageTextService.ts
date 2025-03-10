import { Injectable } from '@nestjs/common';
import {
  CreatePageTextDTO,
  UpdatePageTextsDTO,
  QueryAllPageTextsDTO,
} from '@fictadvisor/utils/requests';
import { PageTextRepository } from '../../../database/v2/repositories/PageTextRepository';

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
    const updPageTexts = [];
    for (const pageText of body.pageTexts) {
      await this.pageTextRepository.update({
        key: pageText.key,
      }, pageText);

      updPageTexts.push(await this.pageTextRepository.findOne({
        key: pageText.key,
      }));
    }

    return updPageTexts;
  }
}
