import { Injectable, PipeTransform } from '@nestjs/common';
import { UpdatePageTextsDTO } from '@fictadvisor/utils/requests';
import { PageTextRepository } from '../../database/v2/repositories/page-text.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

@Injectable()
export class ValidatePageTextsPipe implements PipeTransform {
  constructor (
    private readonly pageTextRepository: PageTextRepository,
  ) {}

  async transform (body: UpdatePageTextsDTO): Promise<UpdatePageTextsDTO> {
    for (const pageText of body.pageTexts) {
      const existingText = await this.pageTextRepository.findOne({ key: pageText.key });

      if (!existingText) {
        throw new InvalidEntityIdException('PageText');
      }
    }

    return body;
  }
}
