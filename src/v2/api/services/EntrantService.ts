import { Injectable } from '@nestjs/common';
import { CreateContractDTO } from '../dtos/CreateContractDTO';
import { EntrantRepository } from '../../database/repositories/EntrantRepository';
import { AlreadyExistException } from '../../utils/exceptions/AlreadyExistException';

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
}