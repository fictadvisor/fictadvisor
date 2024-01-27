import { EduProgramResponse, EduProgramResponses } from '../api/responses/EduProgramResponse';
import { DbEducationalProgram } from '../database/entities/DbEducationalProgram';

export class EduProgramMapper {
  getAll (programs: DbEducationalProgram[]): EduProgramResponses {
    return {
      programs: programs.map((program) => this.get(program)),
    };
  }

  get (program: DbEducationalProgram): EduProgramResponse {
    return {
      id: program.id,
      name: program.name,
      abbreviation: program.abbreviation,
      groupsAmount: program.groups?.length,
    };
  }
}