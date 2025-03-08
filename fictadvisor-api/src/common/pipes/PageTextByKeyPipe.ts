import { Injectable, PipeTransform } from '@nestjs/common';
import { CreatePageTextDTO } from '@fictadvisor/utils/requests';
import { PageTextRepository } from '../../database/v2/repositories/PageTextRepository';
import { AlreadyExistException } from '../exceptions/AlreadyExistException';

@Injectable()
export class PageTextByKeyPipe implements PipeTransform {
  constructor (
    private readonly pageTextRepository: PageTextRepository,
  ) {}

  async transform (body: CreatePageTextDTO): Promise<CreatePageTextDTO> {
    const existingText = await this.pageTextRepository.findOne({ key: body.key });
    if (existingText) {
      throw new AlreadyExistException('PageText with such key');
    }

    return body;
  }
}
