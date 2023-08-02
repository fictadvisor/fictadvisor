import { Injectable } from '@nestjs/common';
import { DbEntrant } from '../database/entities/DbEntrant';

@Injectable()
export class EntrantMapper {
  getEntrantWithContract (entrant: DbEntrant) {
    return {
      firstName: entrant.firstName,
      lastName: entrant.lastName,
      middleName: entrant.middleName,
      speciality: entrant.specialty,
      competitivePoint: entrant.competitivePoint,
      contractNumber: entrant.contract.number,
      date: entrant.contract.date,
    };
  }

  getEntrantWithPriority (entrant: DbEntrant) {
    const priorities = {};
    entrant.priority.priorities.map(({ priority, program }) => {
      priorities[priority] = program;
    });
    return {
      id: entrant.id,
      firstName: entrant.firstName,
      middleName: entrant.middleName,
      lastName: entrant.lastName,
      specialty: entrant.specialty,
      competitivePoint: entrant.competitivePoint,
      state: entrant.priority.state,
      date: entrant.priority.date,
      priorities,
    };
  }
}