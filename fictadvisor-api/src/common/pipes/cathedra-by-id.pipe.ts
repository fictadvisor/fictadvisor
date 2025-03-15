import { Injectable, PipeTransform } from '@nestjs/common';
import { CathedraRepository } from '../../database/v2/repositories/cathedra.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

@Injectable()
export class CathedraByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private cathedraRepository: CathedraRepository,
  ) {}
  
  async transform (cathedraId: string): Promise<string> {
    const cathedra = await this.cathedraRepository.findById(cathedraId);
    if (!cathedra) {
      throw new InvalidEntityIdException('Cathedra');
    }
    return cathedraId;
  }
}
