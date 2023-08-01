import { Injectable } from '@nestjs/common';
import { CreateContractDTO } from '../dtos/CreateContractDTO';
import { EntrantRepository } from '../../database/repositories/EntrantRepository';
import { AlreadyExistException } from '../../utils/exceptions/AlreadyExistException';
import { NamesDTO } from '../dtos/NamesDTO';
import { DataNotFoundException } from '../../utils/exceptions/DataNotFoundException';

@Injectable()
export class EntrantService {
  constructor (
    private readonly entrantRepository: EntrantRepository,
  ) {
  }
  async saveContract ({ entrant: entrantInfo, contract }: CreateContractDTO) {
    const entrant = await this.entrantRepository.find({
      firstName: entrantInfo.firstName,
      middleName: entrantInfo.middleName,
      lastName: entrantInfo.lastName,
    });
    if (entrant) {
      if (entrant.contract) {
        throw new AlreadyExistException('contract');
      }
      return this.entrantRepository.updateById(entrant.id, {
        contract: {
          create: contract,
        },
      });
    } else {
      return this.entrantRepository.create({
        ...entrantInfo,
        contract: {
          create: contract,
        },
      });
    }
  }

  async getPriority (data: NamesDTO) {
    const entrant = await this.entrantRepository.find(data);
    if (!entrant?.priority) throw new DataNotFoundException();
    return entrant;
  }
}