import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContractDTO } from '../dtos/CreateContractDTO';
import { EntrantRepository } from '../../database/repositories/EntrantRepository';
import { AlreadyExistException } from '../../utils/exceptions/AlreadyExistException';
import { FullNameDTO } from '../dtos/FullNameDTO';
import { DataNotFoundException } from '../../utils/exceptions/DataNotFoundException';
import { PriorityState } from '@prisma/client';
import { AdmissionAPI } from '../../telegram/AdmissionAPI';
import { EntrantMapper } from '../../mappers/EntrantMapper';
import { DeleteEntrantDataQueryDTO, EntrantActions } from '../dtos/DeleteEntrantDataQueryDTO';

export enum Actions {
  PRIORITY = 'пріоритет',
  CONTRACT = 'договір',
  ENTRANT = 'вступник',
  ENTRANT_DATA = 'дані',
}

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

  async approveContract ({ entrant: entrantInfo, contract, isForcePushed }: CreateContractDTO) {
    const entrant = await this.findEntrant(entrantInfo.firstName, entrantInfo.middleName, entrantInfo.lastName);
    let newEntrant;
    if (isForcePushed) {
      if (!entrant) {
        newEntrant = await this.entrantRepository.create({
          firstName: entrantInfo.firstName,
          middleName: entrantInfo.middleName,
          lastName: entrantInfo.lastName,
        });
      }
      if (entrant.contract) {
        newEntrant = await this.entrantRepository.updateById(entrant.id, {
          contract: {
            delete: true,
            create: contract,
          },
        });
      }
    } else {
      if (!entrant) {
        throw new NotFoundException('entrant is not found');
      }
      if (entrant.contract) {
        throw new AlreadyExistException('contract');
      }
      newEntrant = await this.entrantRepository.updateById(entrant.id, {
        contract: {
          create: contract,
        },
      });
    }
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

  async deleteEntrantData ({ action, ...data }: DeleteEntrantDataQueryDTO) {
    const entrant = await this.entrantRepository.find(data);
    if (!entrant) throw new DataNotFoundException();

    if (action === EntrantActions.CONTRACT) {
      if (!entrant.entrantData) throw new DataNotFoundException();

      await this.entrantRepository.updateById(entrant.id, {
        entrantData: { delete: true },
        representativeData: { delete: !!entrant.representativeData },
      });

    } else if (action === EntrantActions.PRIORITY) {
      if (!entrant.priority) throw new DataNotFoundException();

      await this.entrantRepository.updateById(entrant.id, {
        priority: { delete: true },
      });

    } else {
      await this.entrantRepository.deleteById(entrant.id);
    }
  }

  async get (query: FullNameDTO) {
    const entrant = await this.entrantRepository.find(query);
    if (!entrant) throw new DataNotFoundException();
    return entrant;
  }

  async deleteEntrant (id: string, action: Actions) {
    const entrant = await this.entrantRepository.findById(id);
    if (!entrant) throw new DataNotFoundException();

    if (action === Actions.ENTRANT_DATA) {
      if (!entrant.entrantData) throw new DataNotFoundException();

      await this.entrantRepository.updateById(entrant.id, {
        entrantData: { delete: true },
        representativeData: { delete: !!entrant.representativeData },
      });

    } else if (action === Actions.PRIORITY) {
      if (!entrant.priority) throw new DataNotFoundException();

      await this.entrantRepository.updateById(entrant.id, {
        priority: { delete: true },
      });

    } else if (action === Actions.ENTRANT) {
      await this.entrantRepository.deleteById(entrant.id);
    } else if (action === Actions.CONTRACT) {
      if (!entrant.contract) throw new DataNotFoundException();

      await this.entrantRepository.updateById(entrant.id, {
        contract: { delete: true },
      });
    }
  }
}