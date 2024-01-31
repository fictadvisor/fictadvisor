import { PageTextRepository } from '../../database/repositories/PageTextRepository';
import { PageText } from '@prisma/client';
import { CreatePageTextDTO } from '../dtos/CreatePageTextDTO';
import { UpdatePageTextDTO, UpdatePageTextsDTO } from '../dtos/UpdatePageTextsDTO';
import { Injectable } from '@nestjs/common';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { QueryAllPageTextsDTO } from '../dtos/QueryAllPageTextsDTO';

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