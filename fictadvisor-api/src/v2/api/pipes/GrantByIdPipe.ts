import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from 'src/v2/utils/exceptions/InvalidEntityIdException';
import { GrantRepository } from '../../database/repositories/GrantRepository';

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
