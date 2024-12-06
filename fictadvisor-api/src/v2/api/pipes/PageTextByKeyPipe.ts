import { Injectable, PipeTransform } from '@nestjs/common';
import { CreatePageTextDTO } from '@fictadvisor/utils/requests';
import { PageTextRepository } from 'src/v2/database/repositories/PageTextRepository';
import { AlreadyExistException } from 'src/v2/utils/exceptions/AlreadyExistException';

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
