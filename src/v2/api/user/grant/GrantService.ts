import { Injectable } from '@nestjs/common';
import { GrantRepository } from './GrantRepository';
import { UpdateGrantDTO } from './dto/UpdateGrantDTO';

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