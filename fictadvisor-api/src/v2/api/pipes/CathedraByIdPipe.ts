import { Injectable, PipeTransform } from '@nestjs/common';
import { CathedraRepository } from '../../database/repositories/CathedraRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';

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
