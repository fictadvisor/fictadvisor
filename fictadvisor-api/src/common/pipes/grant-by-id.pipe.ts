import { Injectable, PipeTransform } from '@nestjs/common';
import { GrantRepository } from '../../database/v2/repositories/grant.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

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
