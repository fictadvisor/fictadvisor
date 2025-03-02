import { Injectable, PipeTransform } from '@nestjs/common';
import { UpdateGroupDTO } from '@fictadvisor/utils';
import { CathedraByIdPipe } from './CathedraByIdPipe';
import { EduProgramByIdPipe } from './EduProgramByIdPipe';
import { StudentByIdPipe } from './StudentByIdPipe';

@Injectable()
export class UpdateGroupPipe implements PipeTransform<UpdateGroupDTO, Promise<UpdateGroupDTO>> {
  constructor (
    private readonly cathedraByIdPipe: CathedraByIdPipe,
    private readonly eduProgramByIdPipe: EduProgramByIdPipe,
    private readonly studentByIdPipe: StudentByIdPipe,
  ) {}

  async transform (body: UpdateGroupDTO): Promise<UpdateGroupDTO> {
    const promises = [];

    const addTransformIfPresent = (value: any, pipe: PipeTransform) => {
      if (value) promises.push(pipe.transform(value, null));
    };

    addTransformIfPresent(body.cathedraId, this.cathedraByIdPipe);
    addTransformIfPresent(body.eduProgramId, this.eduProgramByIdPipe);
    addTransformIfPresent(body.captainId, this.studentByIdPipe);
    if (body.moderatorIds && Array.isArray(body.moderatorIds)) {
      body.moderatorIds.forEach((id) => addTransformIfPresent(id, this.studentByIdPipe));
    }
    await Promise.all(promises);

    return body;
  }
}
