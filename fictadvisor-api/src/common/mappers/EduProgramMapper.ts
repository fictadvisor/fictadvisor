import { EduProgramResponse, EduProgramsResponse } from '@fictadvisor/utils/responses';
import { DbEducationalProgram } from '../../database/v2/entities/DbEducationalProgram';

export class EduProgramMapper {
  getAll (programs: DbEducationalProgram[]): EduProgramsResponse {
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
