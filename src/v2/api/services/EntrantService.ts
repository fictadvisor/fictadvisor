import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContractDTO } from '../dtos/CreateContractDTO';
import { EntrantRepository } from '../../database/repositories/EntrantRepository';
import { AlreadyExistException } from '../../utils/exceptions/AlreadyExistException';
import { NamesDTO } from '../dtos/NamesDTO';
import { DataNotFoundException } from '../../utils/exceptions/DataNotFoundException';
import { PriorityState } from '@prisma/client';

@Injectable()
export class EntrantService {
  constructor (
    private readonly entrantRepository: EntrantRepository,
  ) {
  }
  private findEntrant (firstName: string, middleName: string, lastName: string) {
    return this.entrantRepository.find({
      firstName,
      middleName,
      lastName,
    });
  }
  async saveContract ({ entrant: entrantInfo, contract }: CreateContractDTO) {
    const entrant = await this.findEntrant(entrantInfo.firstName, entrantInfo.middleName, entrantInfo.lastName);
    if (!entrant) {
      throw new NotFoundException('entrant is not found');
    }
    if (entrant.contract) {
      throw new AlreadyExistException('contract');
    }
    return this.entrantRepository.updateById(entrant.id, {
      contract: {
        create: contract,
      },
    });
  }


  async getPriority (data: NamesDTO) {
    const entrant = await this.entrantRepository.find(data);
    if (!entrant?.priority) throw new DataNotFoundException();
    return entrant;
  }

  async approvePriority (body: NamesDTO) {
    const entrant = await this.getPriority(body);
    await this.entrantRepository.updateById(entrant.id, {
      priority: {
        update: {
          state: PriorityState.APPROVED,
        },
      },
    });
  }
}