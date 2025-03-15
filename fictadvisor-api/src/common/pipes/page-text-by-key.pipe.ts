import { Injectable, PipeTransform } from '@nestjs/common';
import { CreatePageTextDTO } from '@fictadvisor/utils/requests';
import { PageTextRepository } from '../../database/v2/repositories/page-text.repository';
import { AlreadyExistException } from '../exceptions/already-exist.exception';

@Injectable()
export class PageTextByKeyPipe implements PipeTransform {
  constructor (
    private readonly pageTextRepository: PageTextRepository,
  ) {}

  async transform (body: CreatePageTextDTO): Promise<CreatePageTextDTO> {
    const existingText = await this.pageTextRepository.find({ key: body.key });
    if (existingText) {
      throw new AlreadyExistException('PageText with such key');
    }

    return body;
  }
}
