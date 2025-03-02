import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateGroupDTO } from '@fictadvisor/utils';
import { CathedraByIdPipe } from './CathedraByIdPipe';
import { EduProgramByIdPipe } from './EduProgramByIdPipe';

@Injectable()
export class CreateGroupPipe implements PipeTransform<CreateGroupDTO, Promise<CreateGroupDTO>> {
  constructor (
    private readonly cathedraByIdPipe: CathedraByIdPipe,
    private readonly eduProgramByIdPipe: EduProgramByIdPipe,
  ) {}

  async transform (body: CreateGroupDTO): Promise<CreateGroupDTO> {
    await Promise.all([
      this.cathedraByIdPipe.transform(body.cathedraId),
      this.eduProgramByIdPipe.transform(body.eduProgramId),
    ]);

    return body;
  }
}
