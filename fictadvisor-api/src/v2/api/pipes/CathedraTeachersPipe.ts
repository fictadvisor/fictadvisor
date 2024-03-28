import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateCathedraDTO } from '../dtos/CreateCathedraDTO';
import { mapAsync } from '../../utils/ArrayUtil';
import { TeacherByIdPipe } from './TeacherByIdPipe';

@Injectable()
export class CathedraTeachersPipe implements PipeTransform<CreateCathedraDTO, Promise<CreateCathedraDTO>> {
  constructor (
    private teacherByIdPipe: TeacherByIdPipe,
  ) {}

  async transform (body: CreateCathedraDTO): Promise<CreateCathedraDTO> {
    const teacherIds = body.teachers;

    if (teacherIds) {
      await mapAsync(teacherIds, async (teacherId: string) => {
        await this.teacherByIdPipe.transform(teacherId);
      });
    }

    return body;
  }
}
