import { Module } from '@nestjs/common';
import { CathedraController } from './v2/CathedraController';
import { CathedraService } from './v2/CathedraService';
import { CathedraByIdPipe } from '../../common/pipes/CathedraByIdPipe';
import { AccessModule } from '../access/AccessModule';
import { MapperModule } from '../../common/mappers/MapperModule';
import { TeacherByIdPipe } from '../../common/pipes/TeacherByIdPipe';

@Module({
  controllers: [CathedraController],
  providers: [CathedraService, CathedraByIdPipe, TeacherByIdPipe],
  exports: [CathedraService, CathedraByIdPipe, TeacherByIdPipe],
  imports: [AccessModule, MapperModule],
})
export class CathedraModule {}
