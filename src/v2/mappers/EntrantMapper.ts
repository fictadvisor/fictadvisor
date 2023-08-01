import { Injectable } from '@nestjs/common';
import { DbEntrant } from '../database/entities/DbEntrant';

@Injectable()
export class EntrantMapper {
  getEntrantWithContract (entrant: DbEntrant) {
    return {
      id: entrant.id,
      firstName: entrant.firstName,
      middleName: entrant.middleName,
      lastName: entrant.lastName,
      specialty: entrant.specialty,
      competitivePoint: entrant.competitivePoint,
      contract: {
        number: entrant.contract.number,
        date: entrant.contract.date,
        group: entrant.contract.group,
      },
    };
  }
}