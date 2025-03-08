import { Injectable } from '@nestjs/common';
import { DbSubject } from '../../database/v2/entities/DbSubject';
import { SubjectResponse } from '@fictadvisor/utils';
import { SubjectsResponse } from '@fictadvisor/utils/responses';

@Injectable()
export class SubjectMapper {
  getSubject (subject: DbSubject): SubjectResponse {
    return {
      id: subject.id,
      name: subject.name,
    };
  }

  getSubjects (subjects: DbSubject[]): SubjectsResponse {
    const mappedSubjects = subjects.map((subject) => this.getSubject(subject));
    return { subjects: mappedSubjects };
  }
}
