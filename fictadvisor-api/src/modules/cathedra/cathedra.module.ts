import { Module } from '@nestjs/common';
import { CathedraController } from './v2/cathedra.controller';
import { CathedraService } from './v2/cathedra.service';
import { CathedraMapper } from '../../common/mappers/cathedra.mapper';
import { CathedraByIdPipe } from '../../common/pipes/cathedra-by-id.pipe';
import { AccessModule } from '../access/access.module';
import { MapperModule } from '../../common/mappers/mapper.module';
import { TeacherByIdPipe } from '../../common/pipes/teacher-by-id.pipe';

@Module({
  controllers: [CathedraController],
  providers: [CathedraService, CathedraMapper, CathedraByIdPipe, TeacherByIdPipe],
  exports: [CathedraService, CathedraMapper, CathedraByIdPipe, TeacherByIdPipe],
  imports: [AccessModule, MapperModule],
})
export class CathedraModule {}
