import { Injectable, PipeTransform } from '@nestjs/common';
import { EntrantRepository } from '../../database/repositories/EntrantRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';

@Injectable()
export class EntrantByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private entrantRepository: EntrantRepository,
  ) {}

  async transform (entrantId: string): Promise<string> {
    const entrant = await this.entrantRepository.findById(entrantId);
    if (!entrant) {
      throw new InvalidEntityIdException('Entrant');
    }
    return entrantId;
  }
}