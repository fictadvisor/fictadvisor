import { Injectable } from '@nestjs/common';
import { GrantRepository } from './GrantRepository';
import { UpdateGrantDTO } from './dto/UpdateGrantDTO';

@Injectable()
export class GrantService {
  constructor (
    private grantRepository: GrantRepository,
  ) {}

  async delete (id: string) {
    await this.grantRepository.delete(id);
  }

  async update (grantId: string, body: UpdateGrantDTO) {
    return this.grantRepository.update(grantId, body);
  }
}