import { Injectable, PipeTransform } from '@nestjs/common';
import { CathedraRepository } from '../../database/v2/repositories/CathedraRepository';
import { InvalidEntityIdException } from '../exceptions/InvalidEntityIdException';

@Injectable()
export class CathedraByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (private cathedraRepository: CathedraRepository) {}

  async transform (id: string): Promise<string> {
    const cathedra = await this.cathedraRepository.findOne({ id });
    if (!cathedra) {
      throw new InvalidEntityIdException('Cathedra');
    }
    return id;
  }
}
