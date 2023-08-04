import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContractDTO } from '../dtos/CreateContractDTO';
import { EntrantRepository } from '../../database/repositories/EntrantRepository';
import { AlreadyExistException } from '../../utils/exceptions/AlreadyExistException';
import { FullNameDTO } from '../dtos/FullNameDTO';
import { DataNotFoundException } from '../../utils/exceptions/DataNotFoundException';
import { PriorityState } from '@prisma/client';
import { AdmissionAPI } from '../../telegram/AdmissionAPI';
import { EntrantMapper } from '../../mappers/EntrantMapper';

@Injectable()
export class EntrantService {
  constructor (
    private readonly entrantRepository: EntrantRepository,
    private readonly admissionAPI: AdmissionAPI,
    private readonly entrantMapper: EntrantMapper,
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
    const newEntrant = await this.entrantRepository.updateById(entrant.id, {
      contract: {
        create: contract,
      },
    });
    const mappedEntrant = this.entrantMapper.getEntrantWithContract(newEntrant);
    await this.admissionAPI.sendContract(mappedEntrant);
    return mappedEntrant;
  }


  async getPriority (data: FullNameDTO) {
    const entrant = await this.entrantRepository.find(data);
    if (!entrant?.priority) throw new DataNotFoundException();
    return entrant;
  }

  async approvePriority (body: FullNameDTO) {
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