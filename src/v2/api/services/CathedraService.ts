import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CathedraRepository } from '../../database/repositories/CathedraRepository';

@Injectable()
export class CathedraService {
  constructor (
    private cathedraRepository: CathedraRepository,
  ) {}

  async create (body: Prisma.CathedraUncheckedCreateInput) {
    return this.cathedraRepository.create(body);
  }
}
