import { Injectable, PipeTransform } from '@nestjs/common';
import { UpdatePageTextsDTO } from '@fictadvisor/utils/requests';
import { PageTextRepository } from 'src/v2/database/repositories/PageTextRepository';
import { InvalidEntityIdException } from 'src/v2/utils/exceptions/InvalidEntityIdException';

@Injectable()
export class ValidatePageTextsPipe implements PipeTransform {
  constructor (
    private readonly pageTextRepository: PageTextRepository,
  ) {}

  async transform (body: UpdatePageTextsDTO): Promise<UpdatePageTextsDTO> {
    for (const pageText of body.pageTexts) {
      const existingText = await this.pageTextRepository.find({ key: pageText.key });

      if (!existingText) {
        throw new InvalidEntityIdException('PageText');
      }
    }

    return body;
  }
}
