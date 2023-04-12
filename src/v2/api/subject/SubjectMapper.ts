import { Injectable } from '@nestjs/common';
import { DbSubject } from './DbSubject';

@Injectable()
export class SubjectMapper {
  getSubject (subject: DbSubject) {
    return {
      id: subject.id,
      name: subject.name,
    };
  }
}