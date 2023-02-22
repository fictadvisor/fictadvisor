import { Injectable } from '@nestjs/common';
import { GrantRepository } from './GrantRepository';
import { UpdateGrantDTO } from './dto/UpdateGrantDTO';

@Injectable()
export class GrantService {
  constructor (
    private grantRepository: GrantRepository,
  ) {}

  hasPermission (permission: string, grant: string) {
    const parts = permission.split('.');
    const grantParts = grant.split('.');

    if (grantParts.length > parts.length) return false;

    for (let i = 0; i < parts.length; i++) {
      const part = grantParts[i];
      if (!part) return false;
      if (part === '*') {
        if (i === grantParts.length - 1) return true;
        else continue;
      }
      if (part !== parts[i]) return false;
    }

    return true;
  }

  async delete (id: string) {
    await this.grantRepository.delete(id);
  }

  async update (grantId: string, body: UpdateGrantDTO) {
    return this.grantRepository.update(grantId, body);
  }
}