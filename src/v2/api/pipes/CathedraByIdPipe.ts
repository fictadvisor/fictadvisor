import { Injectable, PipeTransform } from '@nestjs/common';
import { CathedraRepository } from '../../database/repositories/CathedraRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';

@Injectable()
export class CathedraByIdPipe implements PipeTransform {
  constructor (
    private cathedraRepository: CathedraRepository,
  ) {}
  
  async transform (cathedraId: string) {
    const cathedra = await this.cathedraRepository.findById(cathedraId);
    if (!cathedra) {
      throw new InvalidEntityIdException('cathedra'); 
    }
    return cathedraId;
  }
}
