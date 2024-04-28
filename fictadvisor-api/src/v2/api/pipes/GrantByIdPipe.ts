import { Injectable, PipeTransform } from '@nestjs/common';
import { GrantRepository } from '../../database/repositories/GrantRepository';
import { InvalidEntityIdException } from 'src/v2/utils/exceptions/InvalidEntityIdException';

@Injectable()
export class GrantByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
        private grantRepository: GrantRepository
  ) {}

  async transform (grantId: string): Promise<string> {
    const grant = await this.grantRepository.findById(grantId);
    if (!grant) {
      throw new InvalidEntityIdException('Grant');
    }
    return grantId;
  }
}
