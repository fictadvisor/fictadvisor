import { Injectable, PipeTransform } from '@nestjs/common';
import { UpdateEventDTO } from '@fictadvisor/utils/requests';
import { TeacherRepository } from '../../database/v2/repositories/teacher.repository';
import { DisciplineRepository } from '../../database/v2/repositories/discipline.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

@Injectable()
export class EventPipe implements PipeTransform<UpdateEventDTO, Promise<UpdateEventDTO>> {
  constructor (
    private readonly teacherRepository: TeacherRepository,
    private readonly disciplineRepository: DisciplineRepository,
  ) {}

  async transform (body: UpdateEventDTO): Promise<UpdateEventDTO> {

    if (body.disciplineId) {
      const discipline = await this.disciplineRepository.findOne({ id: body.disciplineId });
      if (!discipline) {
        throw new InvalidEntityIdException('Discipline');
      }
    }

    if (body.teachers) {
      for (const teacherId of body.teachers) {
        await this.teacherByIdPipe(teacherId);
      }
    }
    return body;
  }

  private async teacherByIdPipe (id: string) {
    const teacher = await this.teacherRepository.findOne({ id });
    if (!teacher) {
      throw new InvalidEntityIdException('Teacher');
    }
  }
}

