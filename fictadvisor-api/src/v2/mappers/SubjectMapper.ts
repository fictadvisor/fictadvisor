import { Injectable } from '@nestjs/common';
import { DbSubject } from '../database/entities/DbSubject';
import { SubjectResponse } from '@fictadvisor/utils';

@Injectable()
export class SubjectMapper {
  getSubject (subject: DbSubject): SubjectResponse {
    return {
      id: subject.id,
      name: subject.name,
    };
  }
}
