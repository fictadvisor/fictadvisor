import { Module } from '@nestjs/common';
import { CathedraController } from './v2/cathedra.controller';
import { CathedraService } from './v2/cathedra.service';
import { CathedraByIdPipe } from '../../common/pipes/cathedra-by-id.pipe';
import { AccessModule } from '../access/access.module';
import { TeacherByIdPipe } from '../../common/pipes/teacher-by-id.pipe';
import { CathedraMapperModule } from './v2/mappers/cathedra-mapper.module';

@Module({
  controllers: [CathedraController],
  providers: [CathedraService, CathedraByIdPipe, TeacherByIdPipe],
  exports: [CathedraService, CathedraByIdPipe, TeacherByIdPipe],
  imports: [AccessModule, CathedraMapperModule],
})
export class CathedraModule {}
