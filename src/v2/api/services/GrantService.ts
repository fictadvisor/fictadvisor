import { Injectable } from '@nestjs/common';
import { GrantRepository } from '../../database/repositories/GrantRepository';
import { UpdateGrantDTO } from '../dtos/UpdateGrantDTO';

@Injectable()
export class GrantService {
  constructor (
    private grantRepository: GrantRepository,
  ) {}

  async delete (id: string) {
    return this.grantRepository.deleteById(id);
  }

  async update (grantId: string, body: UpdateGrantDTO) {
    return this.grantRepository.updateById(grantId, body);
  }
}