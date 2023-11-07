import { Injectable } from '@nestjs/common';
import { GrantRepository } from '../../database/repositories/GrantRepository';

@Injectable()
export class GrantService {
  constructor (
    private grantRepository: GrantRepository,
  ) {}

  async delete (id: string) {
    return this.grantRepository.deleteById(id);
  }

}