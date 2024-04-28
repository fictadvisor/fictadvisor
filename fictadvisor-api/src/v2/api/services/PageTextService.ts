import { Injectable } from '@nestjs/common';
import {
  CreatePageTextDTO,
  UpdatePageTextDTO,
  UpdatePageTextsDTO,
  QueryAllPageTextsDTO,
} from '@fictadvisor/utils/requests';
import { PageTextRepository } from '../../database/repositories/PageTextRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
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
    await this.pageTextsValidation(body.pageTexts);

    const updPageTexts: PageText[] = [];
    for (const pageText of body.pageTexts) {
      const updResource = await this.pageTextRepository.update(pageText.key, pageText);
      updPageTexts.push(updResource);
    }

    return updPageTexts;
  }

  async pageTextsValidation (pageTexts: UpdatePageTextDTO[]) {
    for (const pageText of pageTexts) {
      if (!await this.pageTextRepository.find({ key: pageText.key })) {
        throw new InvalidEntityIdException('PageText');
      }
    }
  }
}